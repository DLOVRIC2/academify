# Use an official Python runtime as the base image
FROM python:3.10

# Create backend directory
WORKDIR /backend

# Install backend dependencies
COPY requirements.txt .
RUN pip3 install -r requirements.txt

# Copy the remainder of the files
COPY . .

# Expose port
EXPOSE 8000

# Run the backend server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]