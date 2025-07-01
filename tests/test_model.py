import os
import joblib
import pandas as pd
from sklearn.metrics import f1_score, accuracy_score
from sklearn.model_selection import train_test_split

import pytest

@pytest.fixture
def modelo_carregado():
    return joblib.load("modelo_classificador_wine_ff.pkl")

@pytest.fixture
def dados_teste():
    DATA_URL = "https://archive.ics.uci.edu/ml/machine-learning-databases/wine-quality/winequality-red.csv"
    DATA_PATH = "winequality-red.csv"

    # Baixar automaticamente se necessário
    if not os.path.exists(DATA_PATH):
        import urllib.request
        print("Baixando o dataset...")
        urllib.request.urlretrieve(DATA_URL, DATA_PATH)

    df = pd.read_csv(DATA_PATH, sep=";")
    df.columns = [c.strip().lower().replace(" ", "_") for c in df.columns]

    # Reagrupar qualidade
    def agrupar(q):
        if q <= 4:
            return "baixa"
        elif q <= 6:
            return "media"
        else:
            return "alta"

    df["qualidade_agrupada"] = df["quality"].apply(agrupar)
    X = df.drop(columns=["quality", "qualidade_agrupada"])
    y = df["qualidade_agrupada"]
    return train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

def test_f1_score_minimo(modelo_carregado, dados_teste):
    X_train, X_test, y_train, y_test = dados_teste
    y_pred = modelo_carregado.predict(X_test)

    score = f1_score(y_test, y_pred, average="macro")
    print("F1-score (macro):", score)

    assert score >= 0.62, f"Modelo reprovado: F1-score abaixo do mínimo (score={score:.2f})"


def test_accuracy_minima(modelo_carregado, dados_teste):
    X_train, X_test, y_train, y_test = dados_teste
    y_pred = modelo_carregado.predict(X_test)

    score = accuracy_score(y_test, y_pred)
    print("Accuracy:", score)

    assert score >= 0.75, f"Modelo reprovado: Accuracy abaixo do mínimo (score={score:.2f})"