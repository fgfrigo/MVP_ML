# Wine Quality Classifier

Este projeto utiliza aprendizado de máquina para classificar vinhos em três categorias: **baixa**, **média** e **alta** qualidade. A solução foi construída com:

- Jupyter Notebook para modelagem e avaliação
- FastAPI para servir o modelo via REST
- HTML + JS (Tailwind) para o frontend interativo

---

## 📊 Dataset utilizado

Dataset original: [Wine Quality (UCI Repository)](https://archive.ics.uci.edu/ml/datasets/Wine+Quality)  
Versão usada: `winequality-red.csv` (reagrupada para 3 classes)

---

## 📔 Notebook (Google Colab)

Você pode abrir e testar o notebook diretamente no Google Colab:

[🔗 Acessar no Google Colab](https://colab.research.google.com/drive/1wlA6TkPp3Ib4rsA7fkpTQIj1wOihEYV5#scrollTo=b4ca0c579b361942)
---

## 🧠 Backend - FastAPI

Veja instruções de instalação, execução e uso da API na pasta [`/backend`](./backend/README.md)

---

## 🎨 Frontend

O frontend estático pode ser encontrado em [`/frontend`](./frontend/README.md), com instruções de como iniciar localmente com `http-server`.

---

## 🚀 Objetivo

Permitir que usuários insiram características físico-químicas de um vinho e obtenham sua classificação predita por um modelo treinado com técnicas de balanceamento (como SMOTE).

---
