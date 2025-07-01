# Base image com Python
FROM python:3.11-slim

# Diretório de trabalho
WORKDIR /app

# Copiar arquivos necessários
COPY requirements.txt ./
COPY predict_api.py ./
COPY modelo_classificador_wine_ff.pkl ./

# Instalar dependências
RUN pip install --no-cache-dir -r requirements.txt

# Expor a porta da API
EXPOSE 8000

# Comando de execução
CMD ["uvicorn", "predict_api:app", "--host", "0.0.0.0", "--port", "8000"]
