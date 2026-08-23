import { useEffect, useState } from "react";
import Barra from "./components/Barra";
import "./App.css";

function App() {
  const [nome, setNome] = useState("");
  const [nomePet, setNomePet] = useState("Tamagotchi");
  const [erroNome, setErroNome] = useState("");
  const [jogoIniciado, setJogoIniciado] = useState(false);
  const [fome, setFome] = useState(50);
  const [felicidade, setFelicidade] = useState(50);
  const [energia, setEnergia] = useState(50);
  const [tipoPet, setTipoPet] = useState("gato");

  useEffect(() => {
    if (!jogoIniciado) {
      return;
    }

    const intervaloFome = setInterval(() => {
      setFome((fomeAtual) => Math.max(fomeAtual - 10, 0));
    }, 10000);

    const intervaloFelicidade = setInterval(() => {
      setFelicidade((felicidadeAtual) => Math.max(felicidadeAtual - 10, 0));
    }, 15000);

    const intervaloEnergia = setInterval(() => {
      setEnergia((energiaAtual) => Math.max(energiaAtual - 10, 0));
    }, 20000);

    return () => {
      clearInterval(intervaloFome);
      clearInterval(intervaloFelicidade);
      clearInterval(intervaloEnergia);
    };
  }, [jogoIniciado]);

  function escolherNome() {
    if (nome.trim() === "") {
      setErroNome("Por favor, digite um nome válido.");
      return;
    }
    setNomePet(nome.trim());
    setErroNome("");
    setJogoIniciado(true);
  }

  function alimentar() {
    if (fome < 100) {
      setFome(fome + 10);
    }
  }
  function brincar() {
    if (felicidade < 100) {
      setFelicidade(felicidade + 10);
    }
  }
  function dormir() {
    if (energia < 100) {
      setEnergia(energia + 10);
    }
  }

  let estadoPet = "feliz";
  let mensagem = "Estou feliz!";

  if (fome < 20) {
    estadoPet = "fome";
    mensagem = "Estou com fome!";
  } else if (felicidade < 20) {
    estadoPet = "triste";
    mensagem = "Estou triste!";
  } else if (energia < 20) {
    estadoPet = "sono";
    mensagem = "Estou cansado!";
  }

  return (
    <main className="tamagotchi">
      <h1>Meu Bichinho</h1>
      {!jogoIniciado && (
        <div className="inicio-jogo">
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
        </div>
      )}

      <h2>Nome: {nomePet}</h2>
      <div className="pet">
        <img
          src={`img/${tipoPet}-${estadoPet}.png`}
          alt={`${tipoPet} chamado ${nomePet}: ${mensagem}`}
        />
        <p>{mensagem}</p>
      </div>
      <p>Fome: {fome}</p>
      <Barra valor={fome} nome="Fome" />

      <p>Felicidade: {felicidade}</p>
      <Barra valor={felicidade} nome="Felicidade" />

      <p>Energia: {energia}</p>
      <Barra valor={energia} nome="Energia" />
      <button onClick={alimentar} disabled={!jogoIniciado}>
        Alimentar
      </button>
      <button onClick={brincar} disabled={!jogoIniciado}>
        Brincar
      </button>
      <button onClick={dormir} disabled={!jogoIniciado}>
        Dormir
      </button>
    </main>
  );
}

export default App;
