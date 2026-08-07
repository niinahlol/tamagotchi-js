// Atributos iniciais padrão
let fome = 50;
let felicidade = 50;
let energia = 50;

// Jogo não inicia, evita perder os atributos antes de escolher um nome
let jogoIniciado = false;

// Funções de interação
function escolherNome() {
  let nome = document.getElementById("inputNome").value.trim();

  if (nome === "") {
    document.getElementById("erroNome").textContent =
      "Escolha um nome para seu pet!!";
  } else {
    document.getElementById("erroNome").textContent = "";
    document.getElementById("nomePet").textContent = nome;
    document.getElementById("escolherNome").style.display = "none";
    jogoIniciado = true;
    document.getElementById("btnAlimentar").disabled = false;
    document.getElementById("btnBrincar").disabled = false;
    document.getElementById("btnDormir").disabled = false;
  }
}

function mostrarMensagemTemporaria(texto) {
  document.getElementById("mensagem").textContent = texto;
  setTimeout(function () {
    verificarStatus();
  }, 1000);
}

function alimentar() {
  if (!jogoIniciado) {
    return;
  }
  if (fome < 100) {
    fome = fome + 10;
    atualizarTela();
    verificarStatus();
  } else {
    mostrarMensagemTemporaria("Minha barriguinha já está cheia!");
  }
}

function brincar() {
  if (!jogoIniciado) {
    return;
  }
  if (felicidade < 100) {
    felicidade = felicidade + 10;
    atualizarTela();
    verificarStatus();
  } else {
    mostrarMensagemTemporaria("Eu não quero brincar agora!");
  }
}

function dormir() {
  if (!jogoIniciado) {
    return;
  }
  if (energia < 100) {
    energia = energia + 10;
    atualizarTela();
    verificarStatus();
  } else {
    mostrarMensagemTemporaria("Sem soninho!");
  }
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
