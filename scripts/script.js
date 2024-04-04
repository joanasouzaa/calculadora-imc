// IMC DATA
const data = [
  {
    min: 0,
    max: 18.4,
    classification: "Menor que 18,5",
    info: "Magreza",
    obesity: "0",
  },
  {
    min: 18.5,
    max: 24.9,
    classification: "Entre 18,5 e 24,9",
    info: "Normal",
    obesity: "0",
  },
  {
    min: 25,
    max: 29.9,
    classification: "Entre 25,0 e 29,9",
    info: "Sobrepeso",
    obesity: "I",
  },
  {
    min: 30,
    max: 39.9,
    classification: "Entre 30,0 e 39,9",
    info: "Obesidade",
    obesity: "II",
  },
  {
    min: 40,
    max: 99,
    classification: "Maior que 40,0",
    info: "Obesidade grave",
    obesity: "III",
  },
];

// Seleção de elementos
const imcTable = document.querySelector("#imc-table");

const heightInput = document.querySelector("#height");
const weightInput = document.querySelector("#weight");
const calcBtn = document.querySelector("#calc-btn");
const clearBtn = document.querySelector("#clear-btn");

const imcNumber = document.querySelector("#imc-number span");
const imcInfo = document.querySelector("#imc-info span");

const calcContainer = document.querySelector("#calc-container");
const resultContainer = document.querySelector("#result-container");

const backBtn = document.querySelector("#back-btn");


//Funções

//Criação da tabela IMC com as informações -> os elementos que serão mostrados ao usuário com base nas informações do array
function createTable(data) {
  data.forEach((item) => {

    const div = document.createElement("div");
    div.classList.add("table-data");

    const classification = document.createElement("p");
    classification.innerText = item.classification;

    const info = document.createElement("p");
    info.innerText = item.info;

    const obesity = document.createElement("p");
    obesity.innerText = item.obesity;

    div.appendChild(classification)
    div.appendChild(info);
    div.appendChild(obesity);

    imcTable.appendChild(div);
  });
}

//Inputs recebam apenas números e vírgulas
function validDigits(text) {
  return text.replace(/[^0-9,]/g, "");
}

//Limpar os dados da página inicial
function clearInputs() {
  heightInput.value = ''
  weightInput.value = ''
}


//Calcular o IMC com base nos dados apresentados pelo usuário
function calcImc(weight, height) {
  const imc = (weight / (height * height)).toFixed(1);

  return imc
}

//Mostrar ou ocultar a página de inserçaõ de dados e a página dos resultados
function showOrHideResult() {
  calcContainer.classList.toggle("hide");
  resultContainer.classList.toggle("hide");
}

//Inicialização
createTable(data);


//Eventos

//Validação dos dados dos inputs quando o usuário digitar os valores
const infoInputs = [heightInput, weightInput];

infoInputs.forEach((el) => {
  el.addEventListener("input", (e) => {
    const updatedValue = validDigits(e.target.value);

    e.target.value = updatedValue;
  });
});


//Listener para quando o usuário clicar para calcular IMC
calcBtn.addEventListener('click', (e) => {
  e.preventDefault();

  //Replace para que o JS entenda as vírgulas como ponto (realizar a operação do IMC corretamente)
  const weight = +weightInput.value.replace(",", ".");
  const height = +heightInput.value.replace(",", ".");
  // console.log(weight, height)

  //Casa não haja informações corretas não haverá operação
  if (!weight || !height) return;

  const imc = calcImc(weight, height);

  console.log(imc);
  let info;

  data.forEach((item) => {
    if (imc >= item.min && imc <= item.max) {
      info = item.info
    }
  })

  if (!info) return

  imcNumber.innerText = imc;
  imcInfo.innerText = info;

  //Adicionando as cores para as classes infos
  switch (info) {
    case "Magreza":
      imcNumber.classList.add("low");
      imcInfo.classList.add("low");
      break;

    case "Normal":
      imcNumber.classList.add("good");
      imcInfo.classList.add("good");
      break;

    case "Sobrepeso":
      imcNumber.classList.add("low");
      imcInfo.classList.add("low");
      break;

    case "Obesidade":
      imcNumber.classList.add("high");
      imcInfo.classList.add("high");
      break;

    case "Obesidade grave":
      imcNumber.classList.add("high");
      imcInfo.classList.add("high");
      break;
  }

  //Função para mostrar ou ocultar os resultados
  showOrHideResult()
})

//Limpar os dados inseridos pelos usuários
clearBtn.addEventListener("click", (e) => {
  e.preventDefault();

  clearInputs();

})

//Voltar para a página inicial
backBtn.addEventListener("click", () => {
  clearInputs();
  showOrHideResult();
})