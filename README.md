# 🧠 EMOTIA — AI Emotion Intelligence

<p align="center">

  **Understand the emotion behind every sentence.**

  An AI-powered text emotion classification application built using Deep Learning, BiGRU, FastAPI, HTML, CSS, and JavaScript.

</p>

---

## 📌 Overview

**EMOTIA** is an AI-powered emotion classification system that analyzes text and predicts the emotion expressed by the user.

The application uses a **Bidirectional GRU (BiGRU) deep learning model** to classify text into six emotion categories.

Users can enter a sentence and receive the predicted emotion, confidence score, and probability distribution across all supported emotions.

The project combines a deep learning model with a FastAPI backend and an interactive web interface.

---

## ✨ Features

- 🧠 **Deep Learning:** Emotion classification using a trained BiGRU model.
- 💬 **Text Analysis:** Analyze user-provided text to identify emotional expressions.
- 🎭 **Six Emotion Categories:** Joy, Love, Sadness, Anger, Fear, and Surprise.
- 📊 **Confidence Score:** Displays the model's confidence in its prediction.
- 📈 **Emotion Probabilities:** Shows the probability distribution for all emotion categories.
- ⚡ **FastAPI Backend:** Provides REST API endpoints for prediction.
- 🎨 **Interactive Frontend:** Built with HTML, CSS, and JavaScript.
- 📱 **Responsive Design:** Designed to work across different screen sizes.
- 🚀 **Deployment Ready:** Can be deployed as a web service using Render.

---

## 🎭 Supported Emotions

| Emotion | Description |
|---|---|
| 😊 Joy | Happiness, excitement, and positive feelings |
| ❤️ Love | Affection and emotional attachment |
| 😢 Sadness | Sorrow and disappointment |
| 😠 Anger | Frustration and irritation |
| 😨 Fear | Anxiety and worry |
| 😲 Surprise | Unexpected experiences and reactions |

---

## 🛠️ Tech Stack

### Machine Learning & Deep Learning
- Python
- TensorFlow
- Keras
- NumPy

### Backend
- FastAPI
- Uvicorn
- Pydantic

### Frontend
- HTML5
- CSS3
- JavaScript

### Model Processing
- Tokenization
- Text preprocessing
- Sequence padding
- BiGRU neural network
- Emotion probability classification

### Deployment
- Render
- Git
- GitHub

---

## 🏗️ Project Structure

```text
EMOTIA/
│
├── Artifacts/
│   ├── BiGRU_Modle.keras
│   └── tokenizer.pkl
│
├── static/
│   ├── index.html
│   ├── styles.css
│   └── app.js
│
├── main.py
├── requirements.txt
├── runtime.txt
├── .gitignore
└── README.md
```

---

## ⚙️ How It Works

The application follows this workflow:

```text
        User Input
            │
            ▼
     Text Preprocessing
            │
            ▼
       Tokenization
            │
            ▼
      Sequence Padding
            │
            ▼
    Trained BiGRU Model
            │
            ▼
    Emotion Classification
            │
            ▼
  Predicted Emotion + Confidence
            │
            ▼
       Web Interface
```

### Prediction Process

1. The user enters text in the EMOTIA interface.
2. The frontend sends the text to the FastAPI prediction endpoint.
3. The backend preprocesses the input text.
4. The tokenizer converts the text into numerical sequences.
5. The sequence is padded to the required length.
6. The trained BiGRU model predicts emotion probabilities.
7. The backend returns the predicted emotion and confidence.
8. The frontend displays the prediction and emotion probabilities.

---

## 🚀 Getting Started

Follow these steps to run EMOTIA locally.

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Navigate into the project directory:

```bash
cd EMOTIA
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual GitHub repository URL.

### 2. Create a Virtual Environment

```bash
python -m venv .venv
```

### 3. Activate the Virtual Environment

**Windows:**

```bash
.venv\Scripts\activate
```

**Linux / macOS:**

```bash
source .venv/bin/activate
```

### 4. Install Dependencies

```bash
pip install -r requirements.txt
```

### 5. Run the Application

```bash
uvicorn main:app --reload
```

### 6. Open the Application

Frontend:

```text
http://127.0.0.1:8000/
```

API documentation:

```text
http://127.0.0.1:8000/docs
```

Health check:

```text
http://127.0.0.1:8000/health
```

---

## 🔌 API Endpoints

The application provides the following endpoints.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Loads the EMOTIA frontend |
| GET | `/health` | Checks application and model status |
| POST | `/predict` | Predicts emotion from text |
| GET | `/docs` | Interactive FastAPI documentation |

### Emotion Prediction

**Endpoint:**

```http
POST /predict
```

**Request Body:**

```json
{
  "text": "I feel so happy and excited"
}
```

**Example Response:**

```json
{
  "text": "I feel so happy and excited",
  "predicted_emotion": "joy",
  "confidence": 0.9994,
  "all_probabilities": {
    "sadness": 0.0000,
    "joy": 0.9994,
    "love": 0.0003,
    "anger": 0.0000,
    "fear": 0.0000,
    "surprise": 0.0000
  }
}
```

*Example values are illustrative. Actual predictions and probabilities depend on the input and model.*

---

## 🧪 Example Predictions

| Input Text | Expected Emotion |
|---|---|
| I am so happy today! | Joy |
| I really love spending time with you. | Love |
| I feel lonely and disappointed. | Sadness |
| I am extremely frustrated. | Anger |
| I am scared about what might happen. | Fear |
| I cannot believe this happened! | Surprise |

*These are example inputs and expected emotion categories, not guaranteed model outputs.*

---

## 📦 Requirements

The project uses the following Python dependencies:

```text
fastapi==0.115.0
uvicorn[standard]==0.30.6
pydantic==2.9.2
tensorflow-cpu==2.17.0
numpy==1.26.4
h5py==3.11.0
```

Install them using:

```bash
pip install -r requirements.txt
```

---

## 🌐 Deployment

EMOTIA can be deployed using Render.

### Deployment Configuration

| Setting | Value |
|---|---|
| Service Type | Web Service |
| Runtime | Python |
| Build Command | `pip install -r requirements.txt` |
| Start Command | `uvicorn main:app --host 0.0.0.0 --port $PORT` |

### Deployment Steps

1. Push the project to GitHub.
2. Create a new Web Service in Render.
3. Connect your GitHub repository.
4. Configure the build and start commands.
5. Deploy the application.
6. Open the generated Render URL.

The frontend and backend are served together through FastAPI.

**Live Demo:** Add your deployed Render URL here.

---

## 🎯 Project Objectives

- Apply deep learning concepts to a practical NLP problem.
- Understand text preprocessing and tokenization.
- Build an emotion classification model using BiGRU.
- Integrate a trained model with FastAPI.
- Develop an interactive frontend using HTML, CSS, and JavaScript.
- Build and deploy an end-to-end AI application.

---

## 🔮 Future Improvements

- Improve model performance through hyperparameter tuning.
- Add additional emotion categories.
- Explore Transformer-based emotion classification.
- Add emotion analysis for longer text.
- Improve prediction visualization.
- Add model evaluation metrics and performance analysis.
- Enhance deployment and scalability.

---

## 👨‍💻 Author

**Vallabhaneni Chenchaiah**

AI / Machine Learning Enthusiast

---

## ⭐ Acknowledgment

Built as a practical project to explore Deep Learning, Natural Language Processing, emotion classification, and AI application development.

---

<p align="center">

  **EMOTIA — Every sentence carries a feeling.**

</p>
