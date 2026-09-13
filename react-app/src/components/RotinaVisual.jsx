function RotinaVisual({ acaoAtual, proximaAcao }) {
  return (
    <div className="rotina-visual">
      <div className="rotina-card agora">
        <span className="rotina-titulo">Agora</span>
        <span className="rotina=conteudo">{acaoAtual || "Descansar"}</span>
      </div>
      <div className="rotina-card depois">
        <span className="rotina-titulo">Depois</span>
        <span className="rotina-conteudo"> {proximaAcao || "Brincar"}</span>
      </div>
    </div>
  );
}

export default RotinaVisual;
