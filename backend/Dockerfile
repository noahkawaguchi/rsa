# Use the official Python image
FROM python:3.13-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV FLASK_ENV=production
ENV FLASK_APP=app:create_app

# Set working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code
COPY . /app/

# Expose the port Flask will run on
EXPOSE 8080

# Command to run the application (1 CPU * 2 + 1 = 3 workers)
CMD ["gunicorn", "-w", "3", "-b", "0.0.0.0:8080", "app:create_app()"]
