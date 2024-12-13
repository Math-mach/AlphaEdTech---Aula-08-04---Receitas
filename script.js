// Lista
const liAdd = document.getElementById("liAdd");
const ulList = document.querySelector(".left");

// Formulario
const formFormulario = document.querySelector(".recipe-form");
const formTitulo = document.getElementById("recipe-title");
const formReceitaValue = document.getElementById("ingredients");
const formPreparacaoValue = document.getElementById("preparation-method");
const btnDeletar = document.getElementById("btnDeletar");

// Array
const receitas = [];

// Variaveis
let index = 1;

// Criação da receita
liAdd.addEventListener("click", createReceita);

function createReceita() {
  const card = document.createElement("li");
  card.innerText = "Nova receita";
  card.classList.add("Card");
  card.dataset.id = index;
  index++;

  card.addEventListener("click", loadreceita);

  ulList.insertBefore(card, ulList.firstChild);

  receitas.push({
    indexR: card.dataset.id,
    titulo: card.innerText,
    ingredientes: null,
    preparacao: null,
  });
}

// Carregar form com a receita

function loadreceita() {
  cardselecionado(this);

  preparedForm(receitas[this.dataset.id - 1]);
}

// Preparar o form com a receita fornecida

function preparedForm(array) {
  formFormulario.style.display = "flex";

  formTitulo.dataset.id = array.indexR;
  formTitulo.value = array.titulo;
  formReceitaValue.value = array.ingredientes;
  formPreparacaoValue.value = array.preparacao;
}

// Eventos dos inputs

formTitulo.addEventListener("input", sychtext);
formTitulo.addEventListener("input", saveState);
formReceitaValue.addEventListener("input", saveState);
formPreparacaoValue.addEventListener("input", saveState);

// fazer o Card e o input do titulo mudarem juntos

function sychtext() {
  const novoTitulo = formTitulo.value;

  const newid = formTitulo.dataset.id;

  const card = document.querySelector(`[data-id="${newid}"]`);

  card.innerText = novoTitulo;
}

// Salvar

function saveState() {
  const id = formTitulo.dataset.id;

  const receita = receitas[id - 1];

  if (receita) {
    receita.titulo = formTitulo.value;
    receita.ingredientes = formReceitaValue.value;
    receita.preparacao = formPreparacaoValue.value;
  }

}

// Deletando o Card e a array

btnDeletar.addEventListener("click", removeCard);

function removeCard() {
  const id = formTitulo.dataset.id;

  const card = document.querySelector(`[data-id="${id}"]`);
  if (card) {
    card.remove();
  }

  for (const element of receitas) {
    if (element.indexR === id) {
      receitas.splice(id - 1, 1);
      break;
    }
  }

  selfwork();

  formTitulo.value = "";
  formReceitaValue.value = "";
  formPreparacaoValue.value = "";
  formFormulario.style.display = "none";
}

// Arrumando o fluxo das card e igualando para cada Card referenciar a sua propria receita

function selfwork() {
  const cards = document.querySelectorAll(".Card");

  let newindex = receitas.length;

  for (const card of cards) {
    card.dataset.id = newindex;

    newindex--;
  }

  newindex = 1;

  for (const receita of receitas) {
    receita.indexR = newindex;
    newindex++;
  }

  index = receitas.length + 1;
}

// Mudar a cor do Card para saber quando está selecionado

function cardselecionado(element) {
  const cards = document.querySelectorAll(".selected");

  for (const card of cards) {
    card.classList.remove("selected");
  }

  const cardSelected = element;

  cardSelected.classList.add("selected");
}
