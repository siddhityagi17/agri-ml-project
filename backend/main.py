from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
import cv2
from PIL import Image
import io

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "AgriML API is running"}

@app.post("/predict")
async def predict(file: UploadFile = File(...), model_type: str = "soil"):
    try:
        # Read image file
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        image = np.array(image)
        
        # Placeholder for actual prediction logic
        return {
            "status": "success",
            "model": model_type,
            "prediction": "placeholder",
            "confidence": 0.95
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)