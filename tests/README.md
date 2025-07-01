# Testes Automatizados de Desempenho do Modelo

Esta pasta contém testes automatizados utilizando **PyTest** para garantir que o modelo `.pkl` atenda a um desempenho mínimo antes de ser implantado.

---

## ✅ Objetivo

Evitar que um modelo abaixo dos requisitos mínimos de qualidade (por exemplo, F1-score) seja implantado em produção ou mantido no repositório.

---

## 📂 Conteúdo

- `test_model.py`: teste com PyTest que carrega o modelo salvo, executa previsões e verifica se o **F1-score macro** atinge o threshold mínimo definido (ex: 0.80).

---

## ▶️ Como executar

1. Instale as dependências:

```bash
pip install -r requirements.txt
```

2. Execute os testes:

```bash
pytest .
```

---

## 📈 Métrica adotada

- **F1-score macro**: valor médio de F1 entre todas as classes, ponderando igualmente cada categoria (`baixa`, `media`, `alta`).
- **Accuracy**: proporção de classificações corretas em relação ao total de amostras. Indicador simples e direto da performance geral do modelo.


---

## 📝 Observação

O teste utiliza o dataset `winequality-red.csv` (UCI) e assume que o modelo salvo é compatível com os dados originais normalizados, e que o arquivo `modelo_classificador_wine.pkl` está disponível na raiz do projeto.
