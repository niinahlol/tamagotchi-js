function ModalAcessibilidade({
  aberto,
  fechar,
  modoTranquilo,
  setModoTranquilo,
}) {
  if (!aberto) return null;

  return (
    <div className="modal" onClick={fechar}>
      <div
        className="modal-conteudo modal-acessibilidade"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-modal-acessibilidade"
      >
        <button
          className="fechar-modal"
          onClick={fechar}
          aria-label="Fechar acessibilidade"
        >
          ×
        </button>

        <h2 id="titulo-modal-acessibilidade">♿ Acessibilidade e Ajustes</h2>

        <div className="opcoes-acessibilidade-modal">
          <label className="opcao-item">
            <input
              type="checkbox"
              checked={modoTranquilo}
              onChange={(e) => setModoTranquilo(e.target.checked)}
            />
            <div className="opcao-texto">
              <strong>Modo Tranquilo (sem morte)</strong>
              <span>
                As necessidades caem mais devagar e seu bichinho não morre.
              </span>
            </div>
          </label>
        </div>

        <button onClick={fechar}>Concluído</button>
      </div>
    </div>
  );
}

export default ModalAcessibilidade;
