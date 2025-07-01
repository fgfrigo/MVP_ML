from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd

# Inicializa a aplicação FastAPI
app = FastAPI(title="Wine Quality Classifier API")

# Middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Carrega o modelo salvo
model = joblib.load("modelo_classificador_wine_ff.pkl")

# Define os campos de entrada esperados
class WineFeatures(BaseModel):
    fixed_acidity: float
    volatile_acidity: float
    citric_acid: float
    residual_sugar: float
    chlorides: float
    free_sulfur_dioxide: float
    total_sulfur_dioxide: float
    density: float
    ph: float
    sulphates: float
    alcohol: float

@app.get("/")
def home():
    return {"message": "API de Classificação de Vinho Online!"}

@app.post("/predict")
def predict(features: WineFeatures):
    # Converte os dados recebidos para DataFrame
    input_df = pd.DataFrame([features.dict()])
    # Faz a predição
    prediction = model.predict(input_df)[0]
    return {"classe_prevista": prediction}
