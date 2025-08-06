#!/bin/bash
echo "Starting server..."
uvicorn main:app --host 0.0.0.0 --port 8000 --timeout-keep-alive 300
