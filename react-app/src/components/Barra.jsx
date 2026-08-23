function escolherCorBarra(valor) {
  if (valor >= 50) {
    return "green";
  } else if (valor > 20) {
    return "gold";
  } else {
    return "red";
  }
}

function Barra({ valor, nome }) {
  return (
    <div
      className="barra"
      role="progressbar"
      aria-label={nome}
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuenow={valor}
    >
      <div
        className="barra-valor"
        style={{
          width: `${valor}%`,
          backgroundColor: escolherCorBarra(valor),
        }}
      ></div>
    </div>
  );
}

export default Barra;
