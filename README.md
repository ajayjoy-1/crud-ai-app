
# Full-Stack AI Person Manager

A robust full-stack web application featuring complete CRUD functionality for managing profiles and an integrated, memory-aware AI Chat assistant powered by Google Gemini. This project is containerized using Docker and architected for production deployment on Render.

## ✨ Features

* **AI Chat Assistant:** Communicate with Google's cutting-edge `gemini-2.5-flash` LLM, featuring persistent chat history stored securely in the database.
* **Complete CRUD Operations:** Create, Read, Update, and Delete person records.
* **Image Handling:** Seamless media uploads for profile pictures, securely routed through the backend.
* **Modern Routing:** Multi-page Single Page Application (SPA) experience using React Router.
* **Production-Ready Architecture:** Multi-container Docker setup featuring Gunicorn as the WSGI server and NGINX as a reverse proxy/static file server.
* **Automated CI/CD:** Ready for automated deployments via Render Blueprints (`render.yaml`).

## 🛠️ Tech Stack

**Frontend:**

* React.js (Vite)
* React Router DOM
* Axios

**Backend:**

* Python / Django
* Django REST Framework (DRF)
* Google GenAI SDK (`google-genai`)

**Database & Infrastructure:**

* PostgreSQL (Production) / SQLite (Local Development)
* Docker & Docker Compose
* NGINX
* Gunicorn

## 📂 Project Structure

```text
crud-ai-app/
├── backend/                  # Django Application
│   ├── api/                  # Main app (Models, Views, Serializers)
│   ├── backend/              # Core settings and routing
│   ├── media/                # Uploaded profile images
│   ├── Dockerfile            # Backend container instructions
│   └── requirements.txt      # Python dependencies
├── frontend/                 # React Application
│   ├── src/                  # Components (App.jsx, Chat.jsx, Persons.jsx)
│   ├── Dockerfile            # Multi-stage frontend build instructions
│   └── package.json          # Node dependencies
├── nginx/                    # NGINX Configuration (Optional for manual deploys)
├── render.yaml               # Infrastructure-as-Code for Render deployment
├── docker-compose.yml        # Local/Manual production orchestration
└── README.md

```

## 🚀 Local Development Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/crud-ai-app.git
cd crud-ai-app

```

### 2. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver

```

### 3. Frontend Setup

Open a new terminal window:

```bash
cd frontend
npm install
npm run dev

```

## ☁️ Production Deployment (Render)

This project includes a `render.yaml` Blueprint for zero-configuration deployments on Render's free tier.

1. Fork or push this repository to your GitHub account.
2. Create an account on [Render.com](https://render.com/).
3. Click **New +** -> **Blueprint** and connect your repository.
4. Render will automatically provision the PostgreSQL database, build the Docker images, and set up the live URLs.

### 🔐 Environment Variables

Ensure the following environment variables are set in your Render Dashboard (under the `crud-backend` service) to enable AI functionality and secure the app:

| Variable | Description |
| --- | --- |
| `GEMINI_API_KEY` | Your secret API key from Google AI Studio |
| `DJANGO_SECRET_KEY` | A long, random string for Django's cryptographic signing |
| `ALLOWED_HOSTS` | Set to `*` or your specific Render domain |

*(Note: Database connection strings and frontend API URLs are handled automatically by the `render.yaml` blueprint).*

## 👨‍💻 Author

**Ajay Joy**

* Python Developer
