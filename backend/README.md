# 🍷 Wine Quality Classifier API

Este projeto expõe um modelo de classificação de vinhos via uma API REST construída com **FastAPI**.  
O modelo foi treinado com o dataset Wine Quality (vinho tinto) da UCI.

---

## 📦 Requisitos

- Python 3.11+
- [opcional] Docker

---

## 🚀 Rodando Localmente

### 1. Instale as dependências

```bash
pip install -r requirements.txt
```

### 2. Inicie a API

```bash
uvicorn predict_api:app --reload
```

Acesse em: [http://localhost:8000](http://localhost:8000)

---

## 🧪 Testando a API

### Endpoint principal

`POST /predict`

#### Exemplo com `curl`:

```bash
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "fixed_acidity": 7.4,
    "volatile_acidity": 0.7,
    "citric_acid": 0,
    "residual_sugar": 1.9,
    "chlorides": 0.076,
    "free_sulfur_dioxide": 11,
    "total_sulfur_dioxide": 34,
    "density": 0.9978,
    "ph": 3.51,
    "sulphates": 0.56,
    "alcohol": 9.4
}'
```

#### Resposta esperada:
```json
{
  "classe_prevista": "media"
}
```

---

## 🐳 Rodando com Docker

### 1. Build da imagem
```bash
docker build -t wine-api .
```

### 2. Execute o container
```bash
docker run -p 8000:8000 wine-api
```

---

## 📁 Arquivos

- `predict_api.py` — Script principal da API
- `modelo_classificador_wine.pkl` — Modelo treinado com SVM
- `requirements.txt` — Lista de dependências Python
- `Dockerfile` — Configuração Docker

---

## ✨ Autor

Este projeto foi gerado como parte de um exercício de classificação com Scikit-Learn + FastAPI.
