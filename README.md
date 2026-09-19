
# 🧠 Mental Health Score Prediction

A Machine Learning-based web application that predicts a mental health score using user-provided academic, social media, and personal information.

The project combines a **FastAPI backend** with a frontend developed using HTML, CSS, and JavaScript. The application is deployed on **Render**.

## 🌐 Live Demo

🚀 **Live Application:** [Mental Health Score Prediction](https://mental-health-score-prediction-1-sik8.onrender.com)

🔗 **Backend API:** [Open Application](https://mental-health-score-prediction-1-sik8.onrender.com)

## 📌 Project Overview

Mental health is an important aspect of a student's overall well-being. This project uses Machine Learning to analyze selected user information and generate a predicted mental health score.

The application provides a web interface where users can enter their details. The frontend sends the information to the FastAPI backend, which uses a trained Machine Learning model to generate a prediction.

> **Disclaimer:** This application is developed for educational purposes and does not provide a medical diagnosis.

## 🚀 Features

- Predicts a mental health score using Machine Learning
- Interactive web interface
- FastAPI-based backend
- HTML, CSS, and JavaScript frontend
- Integration of a saved Machine Learning model
- API-based prediction through the `/predict` endpoint
- Deployment on Render
- User-friendly input form

## 🛠️ Technologies Used

- **Programming Language:** Python
- **Machine Learning:** Scikit-learn
- **Backend:** FastAPI
- **Frontend:** HTML, CSS, JavaScript
- **Model Serialization:** Joblib / Pickle
- **Server:** Uvicorn
- **Deployment Platform:** Render
- **Development Environment:** VS Code

## 📂 Project Structure

```text
Mental-Health-Score-Prediction/
│
├── main.py
├── Mental_Health_Model.pkl
├── index.html
├── script.js
├── style.css
├── requirements.txt
├── ML_PROJECT (1).ipynb
└── README.md
```

## 📊 Input Features

The application collects information such as:

- Age
- Gender
- Country
- Academic Level
- Most Used Social Media Platform
- Purpose of Social Media Usage

The available fields and accepted values are defined in the backend application.

## 🧠 Machine Learning Model

The project uses a trained Machine Learning model saved in the following file:

```text
Mental_Health_Model.pkl
```

The FastAPI backend loads the saved model and uses it to generate predictions based on the information received from the frontend.

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
```

### 2. Navigate to the Project Directory

```bash
cd YOUR_REPOSITORY_NAME
```

### 3. Create a Virtual Environment

```bash
python -m venv .venv
```

### 4. Activate the Virtual Environment

**Windows PowerShell:**

```powershell
.venv\Scripts\Activate.ps1
```

### 5. Install Dependencies

```bash
python -m pip install -r requirements.txt
```

## ▶️ Run the Application Locally

Start the FastAPI server using:

```bash
uvicorn main:app --port 8000 --reload
```

The backend will run locally at:

```text
http://127.0.0.1:8000
```

## 🔗 API Endpoint

### POST `/predict`

The `/predict` endpoint accepts user information and returns the predicted mental health score.

**Local API Endpoint:**

```text
http://127.0.0.1:8000/predict
```

**Deployed API Endpoint:**

```text
https://mental-health-score-prediction-1-sik8.onrender.com/predict
```

The frontend communicates with the backend through this API endpoint.

## ☁️ Deployment on Render

The FastAPI backend is deployed using **Render Web Services**.

### Deployment Details

- **Platform:** Render
- **Framework:** FastAPI
- **Application Server:** Uvicorn
- **Deployment Type:** Web Service
- **Live URL:** https://mental-health-score-prediction-1-sik8.onrender.com

### Build Command

```bash
pip install -r requirements.txt
```

### Start Command

```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

Render provides the port through the `$PORT` environment variable.

## 🔄 Application Workflow

```text
User Input
    ↓
Frontend Form
    ↓
JavaScript API Request
    ↓
FastAPI Backend
    ↓
Data Validation and Preprocessing
    ↓
Machine Learning Model
    ↓
Predicted Mental Health Score
    ↓
Display Result on Frontend
    ↓
Deployment on Render
```

## 💻 How to Use

1. Open the live application.
2. Enter the required information in the form.
3. Submit the details.
4. The frontend sends the information to the backend.
5. The Machine Learning model generates a prediction.
6. View the predicted mental health score.

## 🔮 Future Improvements

- Improve model performance through hyperparameter tuning
- Add model evaluation metrics
- Improve frontend design and accessibility
- Add data visualization
- Improve input validation and error handling
- Add additional relevant features
- Implement enhanced deployment and monitoring

## ⚠️ Disclaimer

This project is intended for educational and demonstration purposes only.

The predicted score should not be considered a medical assessment or diagnosis. Mental health concerns should be discussed with a qualified healthcare professional.

## 👩‍💻 Author

**Shubhangee Rai**

B.Tech – Computer Science and Engineering

Interested in Artificial Intelligence, Machine Learning, Data Science, and Web Development.

## ⭐ Acknowledgment

This project was developed to practice Machine Learning model integration, FastAPI backend development, frontend-backend communication, and cloud deployment using Render.
