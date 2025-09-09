## Diabetes Risk Prediction Web App

A full-stack web application that predicts the risk of diabetes using an XGBoost machine learning model. The frontend is built with **React** and the backend uses **Flask** to serve predictions via an API.

---

## Features

### Frontend (React)
- Interactive form to input personal and health-related details.
- Form validation using `react-hook-form`.
- Displays prediction results with probability.
- User-friendly design with **Tailwind CSS**.

### Backend (Flask)
- Loads a pre-trained **XGBoost** model from a pickle file.
- Provides a `/predict` endpoint to receive POST requests from the frontend.
- Processes input features and returns prediction (0 = low risk, 1 = high risk) with probability.
- Handles missing features and returns error messages.

---

## Dataset
`(https://github.com/GRicciardi00/Kaggle-Diabetes-classification)`
- The dataset contains personal and health features such as age, BMI, cholesterol, blood pressure, smoking history, etc.

---
## What I Learned
- **Full-Stack Integration**: How to connect a React frontend with a Flask backend, send POST requests, and handle responses.
- **ML Model Deployment**: How to load a pre-trained XGBoost model in Flask and serve predictions via an API.
- **Data Handling**: How to process numeric, categorical, and binary features from a form before sending them to the model.
- **Form Handling in React**: Using `react-hook-form` for validation, error handling, and user-friendly input forms.
- **Debugging Full-Stack Issues**: Handling CORS, JSON requests, and model serialization errors..

---

## Getting Started

### Prerequisites
- Python 3.9+
- Node.js & npm
- Recommended: Create virtual environments for backend and frontend.

### Backend Setup
```bash
cd Backend
python -m venv venv
venv\Scripts\activate   # Windows
# or
source venv/bin/activate # Mac/Linux
pip install -r requirements.txt
python app.py
