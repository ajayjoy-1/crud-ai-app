# Use official Python image
FROM python:3.12-slim

# Set environment variables to optimize Python
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install system dependencies required for PostgreSQL and Image processing
RUN apt-get update && apt-get install -y build-essential libpq-dev && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt /app/
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt

# Copy your Django project
COPY . /app/

# Expose port and run Gunicorn (As requested in the PDF)
EXPOSE 8000
# Run migrations, create a default admin (if it doesn't exist), and start the server
CMD sh -c "python manage.py migrate && python manage.py createsuperuser --noinput --username admin --email admin@example.com || true && gunicorn backend.wsgi:application --bind 0.0.0.0:8000"