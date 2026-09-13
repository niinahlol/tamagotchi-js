import { useEffect, useState } from "react";
import Barra from "./components/Barra";
import RotinaVisual from "./components/RotinaVisual";
import ModalAcessibilidade from "./components/ModalAcessibilidade";
import { ALIMENTOS_POR_PET, BRINCADEIRAS_POR_PET } from "./constants/petData";
import "./App.css";

function App() {
  const [nome, setNome] = useState("");
  const [nomePet, setNomePet] = useState("Tamagotchi");
  const [erroNome, setErroNome] = useState("");
  const [jogoIniciado, setJogoIniciado] = useState(false);
  const [fome, setFome] = useState(50);
  const [felicidade, setFelicidade] = useState(50);
  const [energia, setEnergia] = useState(50);
  const [higiene, setHigiene] = useState(100);
  const [bateriaSensorial, setBateriaSensorial] = useState(100);
  const [peso, setPeso] = useState(5.0);
  const [idade, setIdade] = useState(0);
  const [dormindo, setDormindo] = useState(false);
  const [noCantinhoCalmo, setNoCantinhoCalmo] = useState(false);
  const [emAcao, setEmAcao] = useState(false);
  const [modoTranquilo, setModoTranquilo] = useState(false);
  const [tipoPet, setTipoPet] = useState("gato");
  const [vida, setVida] = useState(100);

  const [acaoAtual, setAcaoAtual] = useState("Descansar");
  const [proximaAcao, setProximaAcao] = useState("Brincar");

  const [saveEncontrado, setSaveEncontrado] = useState(() => {
    const saveSalvo = localStorage.getItem("meuBichinhoSave");
    if (!saveSalvo) return null;
    try {
      return JSON.parse(saveSalvo);
    } catch {
      localStorage.removeItem("meuBichinhoSave");
      return null;
    }
  });

  const [modalAberto, setModalAberto] = useState(false);
  const [modalAcessibilidadeAberto, setModalAcessibilidadeAberto] =
    useState(false);
  const [aviso, setAviso] = useState("");

  // Diminuição periódica das necessidades (com tempos em horas para o jogo final)
  useEffect(() => {
    if (!jogoIniciado || dormindo || noCantinhoCalmo) return;

    // Se o Modo Tranquilo estiver ativo, o tempo de decaimento aumenta em 1.8x
    const multiplicadorTempo = modoTranquilo ? 1.8 : 1;

    // 2 Horas = 7.200.000 ms
    const intervaloFome = setInterval(() => {
      setFome((fomeAtual) => Math.max(fomeAtual - 10, 0));
    }, 7200000 * multiplicadorTempo);

    // 3 Horas = 10.800.000 ms
    const intervaloFelicidade = setInterval(() => {
      setFelicidade((felicidadeAtual) => Math.max(felicidadeAtual - 10, 0));
    }, 10800000 * multiplicadorTempo);

    // 4 Horas = 14.400.000 ms
    const intervaloEnergia = setInterval(() => {
      setEnergia((energiaAtual) => Math.max(energiaAtual - 10, 0));
    }, 14400000 * multiplicadorTempo);

    // 5 Horas = 18.000.000 ms
    const intervaloHigiene = setInterval(() => {
      setHigiene((higieneAtual) => Math.max(higieneAtual - 5, 0));
    }, 18000000 * multiplicadorTempo);

    return () => {
      clearInterval(intervaloFome);
      clearInterval(intervaloFelicidade);
      clearInterval(intervaloEnergia);
      clearInterval(intervaloHigiene);
    };
  }, [jogoIniciado, dormindo, noCantinhoCalmo, modoTranquilo]);

  // Recuperação no Cantinho Calmo
  useEffect(() => {
    if (!jogoIniciado || !noCantinhoCalmo) return;

    const intervaloCantinho = setInterval(() => {
      setBateriaSensorial((bateriaAtual) => {
        if (bateriaAtual >= 100) {
          setNoCantinhoCalmo(false);
          setAcaoAtual("Voltando do Cantinho Calmo");
          setProximaAcao("Brincar");
          mostrarAviso("Me sinto calmo e regulado agora!");
          return 100;
        }
        return Math.min(bateriaAtual + 20, 100);
      });
    }, 3000);

    return () => clearInterval(intervaloCantinho);
  }, [jogoIniciado, noCantinhoCalmo]);

  // Passagem da Idade
  useEffect(() => {
    if (!jogoIniciado || (vida <= 0 && !modoTranquilo)) return;

    const intervaloIdade = setInterval(() => {
      setIdade((idadeAtual) => idadeAtual + 1);
    }, 60000);

    return () => clearInterval(intervaloIdade);
  }, [jogoIniciado, vida, modoTranquilo]);

  // Sono Real
  useEffect(() => {
    if (!jogoIniciado || !dormindo) return;

    const intervaloSono = setInterval(() => {
      setEnergia((energiaAtual) => {
        if (energiaAtual >= 100) {
          setDormindo(false);
          setAcaoAtual("Acordar");
          setProximaAcao("Comer");
          mostrarAviso("Acordei totalmente renovado!");
          return 100;
        }
        return Math.min(energiaAtual + 15, 100);
      });
      // Sono também recupera bateria sensorial
      setBateriaSensorial((bateria) => Math.min(bateria + 10, 100));
    }, 3000);

    return () => clearInterval(intervaloSono);
  }, [jogoIniciado, dormindo]);

  // Dano na vida
  useEffect(() => {
    if (!jogoIniciado || (vida <= 0 && !modoTranquilo)) return;

    const intervaloDano = setInterval(() => {
      let dano = 0;
      if (fome === 0) dano += 5;
      if (felicidade === 0) dano += 5;
      if (energia === 0) dano += 5;
      if (higiene === 0) dano += 5;

      if (dano > 0) {
        setVida((vidaAtual) => {
          const novaVida = vidaAtual - dano;
          return modoTranquilo ? Math.max(novaVida, 1) : Math.max(novaVida, 0);
        });
      }
    }, 5000);

    return () => clearInterval(intervaloDano);
  }, [jogoIniciado, vida, fome, felicidade, energia, higiene, modoTranquilo]);

  // Save no LocalStorage
  useEffect(() => {
    if (!jogoIniciado) return;

    const dadosDoJogo = {
      nomePet,
      tipoPet,
      fome,
      felicidade,
      energia,
      higiene,
      bateriaSensorial,
      peso,
      idade,
      vida,
      dormindo,
      noCantinhoCalmo,
      modoTranquilo,
      jogoIniciado,
    };

    localStorage.setItem("meuBichinhoSave", JSON.stringify(dadosDoJogo));
  }, [
    nomePet,
    tipoPet,
    fome,
    felicidade,
    energia,
    higiene,
    bateriaSensorial,
    peso,
    idade,
    vida,
    dormindo,
    noCantinhoCalmo,
    modoTranquilo,
    jogoIniciado,
  ]);

  function continuarJogo() {
    setNomePet(saveEncontrado.nomePet);
    setTipoPet(saveEncontrado.tipoPet);
    setFome(saveEncontrado.fome);
    setFelicidade(saveEncontrado.felicidade);
    setEnergia(saveEncontrado.energia);
    setHigiene(saveEncontrado.higiene ?? 100);
    setBateriaSensorial(saveEncontrado.bateriaSensorial ?? 100);
    setPeso(saveEncontrado.peso ?? 5.0);
    setIdade(saveEncontrado.idade ?? 0);
    setVida(saveEncontrado.vida);
    setDormindo(saveEncontrado.dormindo ?? false);
    setNoCantinhoCalmo(saveEncontrado.noCantinhoCalmo ?? false);
    setModoTranquilo(saveEncontrado.modoTranquilo ?? false);
    setJogoIniciado(true);
    setSaveEncontrado(null);
  }

  function novoJogo() {
    setNome("");
    setNomePet("Tamagotchi");
    setErroNome("");
    setJogoIniciado(false);

    setFome(50);
    setFelicidade(50);
    setEnergia(50);
    setHigiene(100);
    setBateriaSensorial(100);
    setPeso(5.0);
    setIdade(0);
    setVida(100);
    setDormindo(false);
    setNoCantinhoCalmo(false);

    setTipoPet("gato");
    localStorage.removeItem("meuBichinhoSave");
    setSaveEncontrado(null);
  }

  function escolherNome() {
    if (nome.trim() === "") {
      setErroNome("Por favor, digite um nome válido.");
      return;
    }
    setNomePet(nome.trim());
    setErroNome("");
    setJogoIniciado(true);
  }

  function mostrarAviso(texto) {
    setAviso(texto);
    setTimeout(() => {
      setAviso("");
    }, 2000);
  }

  function atualizarRotina(novaAcao, proxima) {
    setAcaoAtual(novaAcao);
    setProximaAcao(proxima);
  }

  function alimentar(item) {
    if (fome < 100) {
      setFome((fomeAtual) => Math.min(fomeAtual + item.valor, 100));
      setPeso((pesoAtual) =>
        parseFloat((pesoAtual + (item.peso || 0.2)).toFixed(1)),
      );
      atualizarRotina(`Comer (${item.nome})`, "Brincar");
      mostrarAviso(`Comi ${item.nome}! Que delícia!`);
    } else {
      mostrarAviso("Minha barriguinha já está cheia!");
    }
  }

  function brincar(item) {
    // Respeito ao limite da Bateria Sensorial
    if (bateriaSensorial <= 20) {
      mostrarAviso(
        "Estou sobrecarregado agora. Preciso ir para o Cantinho Calmo 🌿",
      );
      return;
    }

    if (felicidade < 100) {
      const ehAcaoExterna =
        item.nome.toLowerCase().includes("passeio") ||
        item.nome.toLowerCase().includes("floresta") ||
        item.nome.toLowerCase().includes("explorar");

      if (ehAcaoExterna) {
        setEmAcao(true);
        mostrarAviso(`Fui ${item.nome.toLowerCase()}! Já volto!`);
        atualizarRotina(`${item.nome}`, "Voltar para casa");

        setTimeout(() => {
          setFelicidade((felicidadeAtual) =>
            Math.min(felicidadeAtual + item.valor, 100),
          );
          setHigiene((higieneAtual) => Math.max(higieneAtual - 15, 0));
          setBateriaSensorial((bateria) => Math.max(bateria - 25, 0));
          setPeso((pesoAtual) =>
            Math.max(
              parseFloat((pesoAtual - (item.pesoGasto || 0.3)).toFixed(1)),
              1.0,
            ),
          );
          setEmAcao(false);
          atualizarRotina("Voltar para casa", "Descansar");
          mostrarAviso("Voltei! Foi muito divertido!");
        }, 3000);
      } else {
        setFelicidade((felicidadeAtual) =>
          Math.min(felicidadeAtual + item.valor, 100),
        );
        setHigiene((higieneAtual) => Math.max(higieneAtual - 10, 0));
        setBateriaSensorial((bateria) => Math.max(bateria - 15, 0));
        setPeso((pesoAtual) =>
          Math.max(
            parseFloat((pesoAtual - (item.pesoGasto || 0.2)).toFixed(1)),
            1.0,
          ),
        );
        atualizarRotina(`Brincar (${item.nome})`, "Banho");
        mostrarAviso(`Eu adorei ${item.nome.toLowerCase()}!`);
      }
    } else {
      mostrarAviso("Eu não quero brincar agora!");
    }
  }

  function banhar() {
    if (higiene < 100) {
      setHigiene(100);
      atualizarRotina("Tomar Banho", "Descansar");
      mostrarAviso("Fiquei limpinho e cheiroso!");
    } else {
      mostrarAviso("Já estou limpinho!");
    }
  }

  function alternarCantinhoCalmo() {
    if (noCantinhoCalmo) {
      setNoCantinhoCalmo(false);
      atualizarRotina("Sair do Cantinho Calmo", "Brincar");
      mostrarAviso("Estou pronto para brincar de novo!");
    } else {
      if (bateriaSensorial >= 100) {
        mostrarAviso(
          "Minha bateria sensorial está cheia! Não preciso do cantinho agora.",
        );
        return;
      }
      setNoCantinhoCalmo(true);
      atualizarRotina("Cantinho Calmo 🌿", "Autorregulação");
    }
  }

  function alternarSono() {
    if (dormindo) {
      setDormindo(false);
      atualizarRotina("Acordar", "Comer");
      mostrarAviso("Bom dia!");
    } else {
      if (energia >= 100) {
        mostrarAviso("Estou sem soninho!");
        return;
      }
      setDormindo(true);
      atualizarRotina("Dormir", "Acordar");
    }
  }

  // Determinar estado visual
  let estadoPet = "feliz";
  let mensagem = "Estou feliz!";

  if (vida <= 0 && !modoTranquilo) {
    estadoPet = "morto";
    mensagem = "Meu tempo chegou... Obrigado por cuidar de mim!";
  } else if (dormindo) {
    estadoPet = "sono";
    mensagem = "Zzz... Dormindo...";
  } else if (noCantinhoCalmo) {
    estadoPet = "sono";
    mensagem = "Autorregulando no Cantinho Calmo... 🌿";
  } else if (bateriaSensorial <= 20) {
    estadoPet = "triste";
    mensagem = "Preciso de um tempo calmo... Bateria social baixa.";
  } else if (vida <= 15 && modoTranquilo) {
    estadoPet = "triste";
    mensagem = "Estou me sentindo Fraquinho... Preciso de cuidados!";
  } else if (fome <= 20 && felicidade <= 20 && energia <= 20) {
    estadoPet = "triste";
    mensagem = "Estou com fome, triste e com sono!";
  } else if (fome <= 20 && felicidade <= 20) {
    estadoPet = "triste";
    mensagem = "Estou com fome e triste!";
  } else if (fome <= 20 && energia <= 20) {
    estadoPet = "sono";
    mensagem = "Estou com fome e com sono!";
  } else if (felicidade <= 20 && energia <= 20) {
    estadoPet = "sono";
    mensagem = "Estou triste e com sono!";
  } else if (felicidade <= 20) {
    estadoPet = "triste";
    mensagem = "Estou triste!";
  } else if (fome <= 20) {
    estadoPet = "fome";
    mensagem = "Estou com fome!";
  } else if (energia <= 20) {
    estadoPet = "sono";
    mensagem = "Estou com sono!";
  }

  const jogoBloqueado =
    !jogoIniciado || (vida <= 0 && !modoTranquilo) || emAcao;

  return (
    <main className="tamagotchi">
      <h1>Meu Bichinho</h1>

      {!jogoIniciado && (
        <div className="inicio-jogo">
          {saveEncontrado ? (
            <div className="continuar-jogo">
              {saveEncontrado.vida <= 0 && !saveEncontrado.modoTranquilo ? (
                <>
                  <p>
                    A história de <strong>{saveEncontrado.nomePet}</strong>{" "}
                    chegou ao fim.
                  </p>
                  <button onClick={novoJogo}>Começar novo jogo</button>
                </>
              ) : (
                <>
                  <p>
                    Existe uma partida salva com{" "}
                    <strong>{saveEncontrado.nomePet}</strong>.
                  </p>
                  <button onClick={continuarJogo}>Continuar jogo</button>
                  <button onClick={novoJogo}>Novo jogo</button>
                </>
              )}
            </div>
          ) : (
            <>
              <label htmlFor="tipoPet">Escolha seu bichinho:</label>
              <select
                id="tipoPet"
                value={tipoPet}
                onChange={(e) => setTipoPet(e.target.value)}
              >
                <option value="gato">Gato</option>
                <option value="cachorro">Cachorro</option>
                <option value="dinossauro">Dinossauro</option>
              </select>

              <input
                type="text"
                placeholder="Digite o nome do seu bichinho"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />

              <button onClick={escolherNome}>Começar</button>
              <p className="erro-nome">{erroNome}</p>
            </>
          )}
        </div>
      )}

      <h2>Nome: {nomePet}</h2>

      {jogoIniciado && (
        <div className="info-pet">
          <span>
            Idade: {idade} {idade === 1 ? "dia" : "dias"}
          </span>{" "}
          | <span>Peso: {peso} kg</span>
        </div>
      )}

      {jogoIniciado && (
        <RotinaVisual acaoAtual={acaoAtual} proximaAcao={proximaAcao} />
      )}

      <div
        className="pet"
        style={{
          backgroundImage: `url(img/bg-${dormindo || noCantinhoCalmo ? "noite" : "dia"}.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <img
          src={`img/${tipoPet}-${estadoPet}.png`}
          alt={`${tipoPet} chamado ${nomePet}: ${mensagem}`}
          className={emAcao ? "pet-em-acao" : ""}
        />
      </div>

      <p>{aviso || mensagem}</p>

      <p>Vida: {vida}</p>
      <Barra valor={vida} nome="Vida" />

      <p>Fome: {fome}</p>
      <Barra valor={fome} nome="Fome" />

      <p>Felicidade: {felicidade}</p>
      <Barra valor={felicidade} nome="Felicidade" />

      <p>Energia: {energia}</p>
      <Barra valor={energia} nome="Energia" />

      <p>Higiene: {higiene}</p>
      <Barra valor={higiene} nome="Higiene" />

      <p>Bateria Sensorial 🌿: {bateriaSensorial}</p>
      <Barra valor={bateriaSensorial} nome="Bateria Sensorial" />

      <div className="alimentos">
        <h3>Alimentar</h3>
        {ALIMENTOS_POR_PET[tipoPet].map((alimento) => (
          <button
            key={alimento.nome}
            onClick={() => alimentar(alimento)}
            disabled={jogoBloqueado || dormindo || noCantinhoCalmo}
          >
            {alimento.nome} +{alimento.valor}
          </button>
        ))}
      </div>

      <div className="brincadeiras">
        <h3>Brincar</h3>
        {BRINCADEIRAS_POR_PET[tipoPet].map((brincadeira) => (
          <button
            key={brincadeira.nome}
            onClick={() => brincar(brincadeira)}
            disabled={jogoBloqueado || dormindo || noCantinhoCalmo}
          >
            {brincadeira.nome} +{brincadeira.valor}
          </button>
        ))}
      </div>

      <div className="outras-acoes">
        <button
          onClick={banhar}
          disabled={jogoBloqueado || dormindo || noCantinhoCalmo}
        >
          Limpar / Banho
        </button>

        <button
          onClick={alternarCantinhoCalmo}
          disabled={jogoBloqueado || dormindo}
        >
          {noCantinhoCalmo ? "Sair do Cantinho ☀️" : "Cantinho Calmo 🌿"}
        </button>

        <button
          onClick={alternarSono}
          disabled={jogoBloqueado || noCantinhoCalmo}
        >
          {dormindo ? "Acordar ☀️" : "Dormir 🌙"}
        </button>
      </div>

      {vida <= 0 && !modoTranquilo && (
        <button onClick={novoJogo}>Novo jogo</button>
      )}

      <div className="botoes-rodape">
        <button onClick={() => setModalAberto(true)}>Como jogar?</button>
        <button onClick={() => setModalAcessibilidadeAberto(true)}>
          ♿ Acessibilidade
        </button>
      </div>

      {modalAberto && (
        <div className="modal" onClick={() => setModalAberto(false)}>
          <div
            className="modal-conteudo"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-modal"
          >
            <button
              className="fechar-modal"
              onClick={() => setModalAberto(false)}
              aria-label="Fechar instruções"
            >
              ×
            </button>

            <h2 id="titulo-modal">Como jogar?</h2>

            <p>Cuide bem do seu bichinho para mantê-lo feliz e saudável!</p>
            <p>
              <strong>Bateria Sensorial 🌿:</strong> indica o nível de estímulo.
              Se ficar muito baixa, ele precisará do Cantinho Calmo!
            </p>
            <p>
              <strong>Cantinho Calmo:</strong> ajuda seu pet a se autorregular e
              recuperar a energia social.
            </p>
            <p>
              <strong>Alimentar:</strong> recupera a fome e ajusta o peso.
            </p>
            <p>
              <strong>Brincar:</strong> aumenta a felicidade, diminui a higiene
              e a bateria sensorial.
            </p>

            <button onClick={() => setModalAberto(false)}>Entendi!</button>
          </div>
        </div>
      )}

      <ModalAcessibilidade
        aberto={modalAcessibilidadeAberto}
        fechar={() => setModalAcessibilidadeAberto(false)}
        modoTranquilo={modoTranquilo}
        setModoTranquilo={setModoTranquilo}
      />

      <footer className="creditos">
        Desenvolvido com carinho por Ana — Ninaxt
      </footer>
    </main>
  );
}

export default App;
