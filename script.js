// Atributos iniciais padrão
let fome = 50;
let felicidade = 50;
let energia = 50;
let vida = 100;
let petSelecionado = "";

// Jogo não inicia, evita perder os atributos antes de escolher um nome
let jogoIniciado = false;

// Funções de interação
function selecionarPet(tipo) {
  petSelecionado = tipo;

  document.getElementById("opcaoGato").classList.remove("selecionado");
  document.getElementById("opcaoCachorro").classList.remove("selecionado");
  document.getElementById("opcaoDinossauro").classList.remove("selecionado");
  if (tipo === "gato") {
    document.getElementById("opcaoGato").classList.add("selecionado");
  } else if (tipo === "cachorro") {
    document.getElementById("opcaoCachorro").classList.add("selecionado");
  } else if (tipo === "dinossauro") {
    document.getElementById("opcaoDinossauro").classList.add("selecionado");
  }
}

function escolherNome() {
  let nome = document.getElementById("inputNome").value.trim();

  if (nome === "" && petSelecionado === "") {
    document.getElementById("erroNome").textContent =
      "Escolha um nome e um bichinho!!";
  } else if (nome === "") {
    document.getElementById("erroNome").textContent =
      "Escolha um nome para seu bichinho!";
  } else if (petSelecionado === "") {
    document.getElementById("erroNome").textContent = "Escolha um bichinho!";
  } else {
    document.getElementById("erroNome").textContent = "";
    document.getElementById("nomePet").textContent = nome;

    document.getElementById("escolherNome").style.display = "none";
    document.getElementById("telaJogo").style.display = "block";

    trocarSprite("feliz");

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
  document.getElementById("vida").textContent = vida;
  document.getElementById("barravida").style.width = vida + "%";

  atualizarCorBarra(fome, document.getElementById("barrafome"));
  atualizarCorBarra(felicidade, document.getElementById("barrafelicidade"));
  atualizarCorBarra(energia, document.getElementById("barraenergia"));
  atualizarCorBarra(vida, document.getElementById("barravida"));
}

// Função dinamica para sprites
function trocarSprite(estado) {
  if (petSelecionado === "") {
    return;
  }
  document.getElementById("petImagem").src =
    "img/" + petSelecionado + "-" + estado + ".png";
}

// Verificação de atributos

function verificarStatus() {
  if (vida <= 0) {
    document.getElementById("mensagem").textContent =
      "Meu tempo chegou... Obrigado por cuidar de mim!";
    trocarSprite("morto");
    return;
  }
  if (fome <= 20 && felicidade <= 20 && energia <= 20) {
    document.getElementById("mensagem").textContent =
      "Estou com fominha, tristinho e com soninho!";
    trocarSprite("triste");
  } else if (fome <= 20 && felicidade <= 20) {
    document.getElementById("mensagem").textContent =
      "Estou com fominha e tristinho!";
    trocarSprite("triste");
  } else if (fome <= 20 && energia <= 20) {
    document.getElementById("mensagem").textContent =
      "Estou com fominha e com soninho!";
    trocarSprite("sono");
  } else if (felicidade <= 20 && energia <= 20) {
    document.getElementById("mensagem").textContent =
      "Estou triste e com soninho!";
    trocarSprite("sono");
  } else if (felicidade <= 20) {
    document.getElementById("mensagem").textContent = "Estou tristinho!";
    trocarSprite("triste");
  } else if (fome <= 20) {
    document.getElementById("mensagem").textContent = "Estou com fominha!";
    trocarSprite("fome");
  } else if (energia <= 20) {
    document.getElementById("mensagem").textContent = "Estou com soninho!";
    trocarSprite("sono");
  } else {
    document.getElementById("mensagem").textContent = "Estou feliz!";
    trocarSprite("feliz");
  }
}

function aplicarDano() {
  if (!jogoIniciado || vida <= 0) {
    return;
  }

  let dano = 0;
  if (fome === 0) {
    dano = dano + 5;
  }
  if (felicidade === 0) {
    dano = dano + 5;
  }
  if (energia === 0) {
    dano = dano + 5;
  }

  if (dano > 0) {
    vida = vida - dano;
    if (vida < 0) {
      vida = 0;
    }
    atualizarTela();

    if (vida === 0) {
      finalizarJogo();
    }
  }
}

function finalizarJogo() {
  jogoIniciado = false;

  document.getElementById("btnAlimentar").disabled = true;
  document.getElementById("btnBrincar").disabled = true;
  document.getElementById("btnDormir").disabled = true;

  document.getElementById("mensagem").textContent =
    "Meu tempo chegou... Obrigado por cuidar de mim!";

  trocarSprite("morto");
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

setInterval(function () {
  aplicarDano();
}, 5000);

atualizarTela();
verificarStatus();
