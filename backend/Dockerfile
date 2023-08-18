# Use an official Python runtime as the base image
FROM python:3.10

# Set the working directory
WORKDIR /usr/src/app

# Install FastAPI and Uvicorn
RUN pip install fastapi uvicorn

# Copy the requirements file and install dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the app
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Command to run the app using Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]