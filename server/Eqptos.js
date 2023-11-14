
var Variaveis = {

  liga: {
    modulo: "PLCDesbJundiai600",
    endereco: "Entradas_Saidas.I_BotaoLiga",
    casasDec: null,
    valor: null,
    cor: "lightgreen",
    periodoBD: "300",
    periodoAq: "1000",
    maxBD: 30
  },
  desliga: {
    modulo: "PLCDesbJundiai600",
    endereco: "Entradas_Saidas.I_BotaoDesl",
    casasDec: null,
    valor: null,
    cor: "lightgreen",
    periodoBD: "300",
    periodoAq: "1000",
    maxBD: 30
  },
  autoManual: {
    modulo: "PLCDesbJundiai600",
    endereco: "Global.mSelAutoManual",
    casasDec: null,
    valor: null,
    cor: "lightgreen",
    periodoBD: "300",
    periodoAq: "1000",
    maxBD: 30
  },
  ligado: {
    modulo: "PLCDesbJundiai600",
    endereco: "Global.mAlimentadorLigado",
    casasDec: null,
    valor: null,
    cor: "lightgreen",
    periodoBD: "300",
    periodoAq: "1000",
    maxBD: 30
  },
  avancar: {
    modulo: "PLCDesbJundiai600",
    endereco: "Global.bAvancar",
    casasDec: null,
    valor: false,
    cor: "lightgreen",
    periodoBD: "300",
    periodoAq: "1000",
    maxBD: 30
  },
  medidaDest: {
    modulo: "PLCDesbJundiai600",
    endereco: "Global.medidaDest",
    casasDec: 1,
    valor: 0.0,
    cor: "lightgreen",
    periodoBD: "300",
    periodoAq: "500",
    maxBD: 30,
  },
  velAutomatico: {
    modulo: "PLCDesbJundiai600",
    endereco: "Global.velocidadeAuto",
    casasDec: 0,
    valor: 0,
    cor: "lightgreen",
    periodoBD: "300",
    periodoAq: "2000",
    maxBD: 30,
  },
  velManual: {
    modulo: "PLCDesbJundiai600",
    endereco: "Global.velocidadeManual",
    casasDec: 0,
    valor: 0,
    cor: "lightgreen",
    periodoBD: "300",
    periodoAq: "2000",
    maxBD: 30,
  },
  medidaAtual: {
    modulo: "PLCDesbJundiai600",
    endereco: "Entradas_Saidas.medidaAtual",
    casasDec: 1,
    valor: 0,
    cor: "lightgreen",
    periodoBD: "300",
    periodoAq: "500",
    maxBD: 30,
  },
  posicaoOK: {
    modulo: "PLCDesbJundiai600",
    endereco: "Entradas_Saidas.posicaoOK",
    casasDec: null,
    valor: false,
    cor: "lightgreen",
    periodoBD: "300",
    periodoAq: "1000",
    maxBD: 30,
  },
  startPrensa: {
    modulo: "PLCDesbJundiai600",
    endereco: "Entradas_Saidas.O_StartPrensa",
    casasDec: null,
    valor: false,
    cor: "lightgreen",
    periodoBD: "300",
    periodoAq: "100",
    maxBD: 30,
  },
  driveOK: {
    modulo: "PLCDesbJundiai600",
    endereco: "Entradas_Saidas.driveOK",
    casasDec: null,
    valor: false,
    cor: "lightgreen",
    periodoBD: "300",
    periodoAq: "100",
    maxBD: 30,
  }
}


exports.Variaveis = Variaveis
