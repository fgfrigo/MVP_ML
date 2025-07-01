const fields = [
  "fixed_acidity",
  "volatile_acidity",
  "citric_acid",
  "residual_sugar",
  "chlorides",
  "free_sulfur_dioxide",
  "total_sulfur_dioxide",
  "density",
  "ph",
  "sulphates",
  "alcohol"
];

const form = document.getElementById("wineForm");
const resultadoDiv = document.getElementById("resultado");
const hostInput = document.getElementById("host");

const template = document.getElementById("field-template");

fields.forEach(field => {
  const clone = template.content.cloneNode(true);
  const label = clone.querySelector("label");
  const input = clone.querySelector("input");

  label.textContent = field.replace(/_/g, " ");
  input.name = field;
  input.id = field;

  form.appendChild(clone);
});

const ranges = {
  baixa: {
    fixed_acidity: [7.4, 7.4],
    volatile_acidity: [0.59, 0.59],
    citric_acid: [0.08, 0.08],
    residual_sugar: [4.4, 4.4],
    chlorides: [0.086, 0.086],
    free_sulfur_dioxide: [6.0, 6.0],
    total_sulfur_dioxide: [29.0, 29.0],
    density: [0.9974, 0.9974],
    ph: [3.38, 3.38],
    sulphates: [0.5, 0.5],
    alcohol: [9.0, 9.0]
  },
  media: {
    fixed_acidity: [6.8, 9.0],
    volatile_acidity: [0.24, 0.44],
    citric_acid: [0.24, 0.4],
    residual_sugar: [1.9, 3.0],
    chlorides: [0.07, 0.091],
    free_sulfur_dioxide: [14.0, 22.0],
    total_sulfur_dioxide: [40.0, 65.0],
    density: [0.9964, 0.9980],
    ph: [3.21, 3.31],
    sulphates: [0.54, 0.7],
    alcohol: [10.5, 12.5]
  },
  alta: {
    fixed_acidity: [8.3, 10.4],
    volatile_acidity: [0.27, 0.49],
    citric_acid: [0.4, 0.7],
    residual_sugar: [1.9, 3.8],
    chlorides: [0.062, 0.085],
    free_sulfur_dioxide: [6.0, 20.2],
    total_sulfur_dioxide: [17.0, 54.0],
    density: [0.9947, 0.9973],
    ph: [3.27, 3.38],
    sulphates: [0.65, 0.82],
    alcohol: [11.0, 13.0]
  }
};


function preencherGrupo(grupo) {
  const valores = ranges[grupo];
  fields.forEach(f => {
    const [min, max] = valores[f];
    const value = grupo === "baixa" ? (Math.random() * (max - min) + min) : (Math.random() * (max - min) + min).toFixed(2);
    document.getElementById(f).value = value;
  });
}

document.getElementById("fillBaixa").addEventListener("click", () => preencherGrupo("baixa"));
document.getElementById("fillMedia").addEventListener("click", () => preencherGrupo("media"));
document.getElementById("fillAlta").addEventListener("click", () => preencherGrupo("alta"));

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {};
  fields.forEach(f => {
    data[f] = parseFloat(document.getElementById(f).value);
  });

  const host = hostInput.value.replace(/\/$/, "");

  try {
    const res = await fetch(`${host}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error("Erro na requisição");

    const json = await res.json();
    resultadoDiv.textContent = "Classe prevista: " + json.classe_prevista;
    resultadoDiv.classList.remove("text-red-600");
    resultadoDiv.classList.add("text-green-700");
  } catch (err) {
    resultadoDiv.textContent = "Erro ao conectar com a API.";
    resultadoDiv.classList.remove("text-green-700");
    resultadoDiv.classList.add("text-red-600");
  }
});
