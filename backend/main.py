from fastapi import FastAPI, Form, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
import cv2
import tensorflow as tf
from typing import Dict
import logging

# ===== Setup Logging =====
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ===== Constants =====
CLASS_NAMES = {
    "soil": ["Clay", "Loam", "Sand", "Silt"],
    "plant": ["Healthy", "Leaf_Rust", "Powdery_Mildew"], 
    "pest": ["Aphids", "Whiteflies", "Spider_Mites"]
}

# ===== Helper Functions =====
def process_image(file_contents: bytes, model_type: str) -> np.ndarray:
    """Process uploaded image with correct dimensions for each model"""
    try:
        nparr = np.frombuffer(file_contents, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        if img is None:
            raise ValueError("Unsupported image format. Use JPEG or PNG")

        # Model-specific preprocessing
        if model_type == "soil":
            img = cv2.resize(img, (150, 150))  # Soil model expects 150x150
            img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        elif model_type == "plant":
            img = cv2.resize(img, (224, 224))  # Plant model expects 224x224
        elif model_type == "pest":
            img = cv2.resize(img, (150, 150))  # Pest model expects 150x150
            
        return np.expand_dims(img / 255.0, axis=0)  # Normalize and add batch dim

    except Exception as e:
        logger.error(f"Image processing failed: {str(e)}")
        raise ValueError(f"Image processing error: {str(e)}")

def get_soil_composition(prediction: np.ndarray) -> Dict:
    """Calculate soil composition percentages"""
    return {
        "clay": round(float(prediction[0][0]) * 100, 1),
        "sand": round(float(prediction[0][2]) * 100, 1),
        "silt": round(float(prediction[0][3]) * 100, 1)
    }

def get_plant_treatment(prediction: int) -> str:
    """Get treatment recommendation based on plant disease"""
    treatments = [
        "No treatment needed",
        "Apply copper-based fungicide every 7 days",
        "Use sulfur spray weekly"
    ]
    return treatments[prediction]

def get_pest_risk(confidence: float) -> str:
    """Determine pest risk level"""
    if confidence > 0.8: return "High"
    elif confidence > 0.5: return "Medium"
    return "Low"

# ===== Model Loading =====
MODELS = {}
try:
    MODELS = {
        "soil": tf.keras.models.load_model("models/final_soil_model.keras", compile=False),
        "plant": tf.keras.models.load_model("models/plant_disease_model.keras", compile=False),
        "pest": tf.keras.models.load_model("models/final_pest_model.keras", compile=False)
    }
    logger.info("Models loaded successfully")
    for name, model in MODELS.items():
        logger.info(f"{name} model input shape: {model.input_shape}")
except Exception as e:
    logger.error(f"Error loading models: {str(e)}")
    raise RuntimeError("Failed to load models") from e

# After loading models, add this diagnostic check:
for name, model in MODELS.items():
    logger.info(f"{name} model input shape: {model.input_shape}")
    if model.input_shape[1] == 150:
        logger.info(f"NOTE: {name} requires 150x150 images")
    elif model.input_shape[1] == 224:
        logger.info(f"NOTE: {name} requires 224x224 images")
# ===== FastAPI App =====
app = FastAPI(title="AgriML API", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["POST"],
    allow_headers=["*"],
)

@app.get("/")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "running",
        "models_loaded": list(MODELS.keys()),
        "api_version": "1.0"
    }
@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.post("/predict")
async def predict(
    model_type: str = Form(..., description="Model type: soil, plant, or pest"),
    file: UploadFile = File(..., description="Image file for prediction")
):
    """
    Make predictions using the specified model
    """
    try:
        logger.info(f"Prediction request started for {model_type}")
        
        # Validate model type
        if model_type not in MODELS:
            raise HTTPException(400, detail=f"Invalid model type. Choose from: {list(MODELS.keys())}")
        
        # Validate file type
        if not file.filename.lower().endswith(('.jpg', '.jpeg', '.png')):
            raise HTTPException(400, detail="Only JPG/PNG images are supported")
        
        # Process image
        contents = await file.read()
        processed_img = process_image(contents, model_type)
        logger.info(f"Image processed, shape: {processed_img.shape}")
        
        # Make prediction
        prediction = MODELS[model_type].predict(processed_img)
        class_idx = np.argmax(prediction[0])
        confidence = float(np.max(prediction[0]))
        logger.info(f"Prediction completed: class {class_idx}, confidence {confidence}")
        
        # Prepare response
        response = {
            "status": "success",
            "model": model_type,
            "prediction": CLASS_NAMES[model_type][class_idx],
            "confidence": confidence
        }
        
        # Add model-specific data
        if model_type == "soil":
            response["composition"] = get_soil_composition(prediction)
        elif model_type == "plant":
            response["treatment"] = get_plant_treatment(class_idx)
        elif model_type == "pest":
            response["risk_level"] = get_pest_risk(confidence)
            
        return response
        
    except HTTPException:
        raise
    except ValueError as e:
        logger.error(f"Validation error: {str(e)}")
        raise HTTPException(400, detail=str(e))
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}", exc_info=True)
        raise HTTPException(500, detail=f"Prediction failed: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")