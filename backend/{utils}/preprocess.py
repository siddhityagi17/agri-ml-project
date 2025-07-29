import cv2
import numpy as np
from albumentations import (
    Compose, HorizontalFlip, VerticalFlip, RandomRotate90,
    Resize, Normalize
)

def get_preprocessing_pipeline(image_size=(224, 224)):
    return Compose([
        HorizontalFlip(p=0.5),
        VerticalFlip(p=0.5),
        RandomRotate90(p=0.5),
        Resize(image_size[0], image_size[1]),
        Normalize()
    ])

def preprocess_image(image, pipeline):
    """Process a single image using the given pipeline"""
    augmented = pipeline(image=image)
    return augmented["image"]

def load_image(file_bytes):
    """Convert uploaded file bytes to numpy array"""
    image = np.frombuffer(file_bytes, dtype=np.uint8)
    image = cv2.imdecode(image, cv2.IMREAD_COLOR)
    return cv2.cvtColor(image, cv2.COLOR_BGR2RGB)