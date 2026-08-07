// Atributos iniciais padrão
let fome = 50;
let felicidade = 50;
let energia = 50;

// Jogo não inicia, evita perder os atributos antes de escolher um nome
let jogoIniciado = false;

// Funções NOME FOME FELICIDADE E TRISTEZA
function escolherNome() {
  let nome = document.getElementById("inputNome").value;

  if (nome === "") {
    alert("Nome Vazio!!");
  } else {
    document.getElementById("nomePet").textContent = nome;
    document.getElementById("escolherNome").style.display = "none";
    jogoIniciado = true;
  }
}

function alimentar() {
  if (fome < 100) {
    fome = fome + 10;
  } else {
    alert("Barriguinha Cheia!!");
  }

  atualizarTela();
  verificarStatus();
}

function brincar() {
  if (felicidade < 100) {
    felicidade = felicidade + 10;
  } else {
    alert("Brincadeira tem hora!");
  }
  atualizarTela();
  verificarStatus();
}

function dormir() {
  if (energia < 100) {
    energia = energia + 10;
  } else {
    alert("Sem soninho!");
  }
  atualizarTela();
  verificarStatus();
}

function atualizarCorBarra(valor, barra) {
  if (valor >= 50) {
    barra.style.backgroundColor = "green";
  } else if (valor > 20) {
    barra.style.backgroundColor = "gold";
  } else {
    barra.style.backgroundColor = "red";
  }
}

// Atualização de Tela auto (manter o código limpo )

function atualizarTela() {
  document.getElementById("fome").textContent = fome;
  document.getElementById("barrafome").style.width = fome + "%";

  document.getElementById("felicidade").textContent = felicidade;
  document.getElementById("barrafelicidade").style.width = felicidade + "%";

  document.getElementById("energia").textContent = energia;
  document.getElementById("barraenergia").style.width = energia + "%";

  atualizarCorBarra(fome, document.getElementById("barrafome"));
  atualizarCorBarra(felicidade, document.getElementById("barrafelicidade"));
  atualizarCorBarra(energia, document.getElementById("barraenergia"));
}

// Verificação de atributos

function verificarStatus() {
  if (fome <= 20 && felicidade <= 20 && energia <= 20) {
    document.getElementById("mensagem").textContent =
      "Estou com fominha, tristinho e com soninho!";
    document.getElementById("petImagem").src = "img/pet-triste.png";
  } else if (fome <= 20 && felicidade <= 20) {
    document.getElementById("mensagem").textContent =
      "Estou com fominha e tristinho!";
    document.getElementById("petImagem").src = "img/pet-triste.png";
  } else if (fome <= 20 && energia <= 20) {
    document.getElementById("mensagem").textContent =
      "Estou com fominha e com soninho!";
    document.getElementById("petImagem").src = "img/pet-sono.png";
  } else if (felicidade <= 20 && energia <= 20) {
    document.getElementById("mensagem").textContent =
      "Estou triste e com soninho!";
    document.getElementById("petImagem").src = "img/pet-sono.png";
  } else if (felicidade <= 20) {
    document.getElementById("mensagem").textContent = "Estou tristinho!";
    document.getElementById("petImagem").src = "img/pet-triste.png";
  } else if (fome <= 20) {
    document.getElementById("mensagem").textContent = "Estou com fominha!";
    document.getElementById("petImagem").src = "img/pet-fome.png";
  } else if (energia <= 20) {
    document.getElementById("mensagem").textContent = "Estou com soninho!";
    document.getElementById("petImagem").src = "img/pet-sono.png";
  } else {
    document.getElementById("mensagem").textContent = "Estou feliz!";
    document.getElementById("petImagem").src = "img/pet-feliz.png";
  }
}

// Intervalo de atributos.

setInterval(function () {
  if (jogoIniciado && fome > 0) {
    fome = fome - 10;
  }
  atualizarTela();

  verificarStatus();
}, 10000);

setInterval(function () {
  if (jogoIniciado && felicidade > 0) {
    felicidade = felicidade - 10;
  }
  atualizarTela();
  verificarStatus();
}, 20000);

setInterval(function () {
  if (jogoIniciado && energia > 0) {
    energia = energia - 10;
  }
  atualizarTela();
  verificarStatus();
}, 40000);

atualizarTela();
verificarStatus();
