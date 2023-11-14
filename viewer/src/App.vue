<template>
  <div class="Principal">
    <div class="Titulo">
      <h2>Desbobinador Prensa Jundiaí 600t</h2>
    </div>
    <div class="Sinotico">
      <div class="flexgrid-demo p-p-2">
        <div class="p-grid">
          <div class="p-col-10">
            <div class="p-grid">
              <!-- Medida da chapa -->
              <div class="p-col-4">
                <div class="box"><p>Comprimento da Chapa</p></div>
              </div>
              <div class="p-col-6">
                <div class="box fdobox">
                  <InputMask
                    v-model="Variaveis.medidaDest.valor"
                    mask="9999,9"
                    unmask="true"
                  />
                  <Button
                    label="Salvar"
                    class="
                      p-button-raised
                      p-button-primary
                      p-button-rounded
                      p-button-lg
                    "
                    @click="
                      atualizaVar('medidaDest', Variaveis.medidaDest.valor)
                    "
                  />
                </div>
              </div>
              <div class="p-col-1">
                <div class="box"><p>mm</p></div>
              </div>
              <!-- Velocidade Automático -->
              <div class="p-col-4">
                <div class="box"><p>Velocidade Automático</p></div>
              </div>
              <div class="p-col-6">
                <div class="box fdobox">
                  <InputNumber
                    v-model="Variaveis.velAutomatico.valor"
                    :min="0" :max="100"
                  />
                  <Button
                    label="Salvar"
                    class="
                      p-button-raised
                      p-button-primary
                      p-button-rounded
                      p-button-lg
                    "
                    @click="
                      atualizaVar(
                        'velAutomatico',
                        Variaveis.velAutomatico.valor
                      )
                    "
                  />
                </div>
              </div>
              <div class="p-col-1">
                <div class="box"><p>%</p></div>
              </div>
              <!-- Velocidade Manual -->
              <div class="p-col-4">
                <div class="box"><p>Velocidade Manual</p></div>
              </div>
              <div class="p-col-6">
                <div class="box fdobox">
                  <InputNumber
                    v-model="Variaveis.velManual.valor"
                    :min="0" :max="100"
                  />
                  <Button
                    label="Salvar"
                    class="
                      p-button-raised
                      p-button-primary
                      p-button-rounded
                      p-button-lg
                    "
                    @click="atualizaVar('velManual', Variaveis.velManual.valor)"
                  />
                </div>
              </div>
              <div class="p-col-1">
                <div class="box"><p>%</p></div>
              </div>
              <!-- Medida da chapa atual -->
              <div class="p-col-4">
                <div class="box"><p>Medida Atual</p></div>
              </div>
              <div class="p-col-6">
                <div class="box fdobox">
                  <p>{{ Variaveis.medidaAtual.valor / 1000 }}</p>
                </div>
              </div>
              <div class="p-col-1">
                <div class="box"><p>mm</p></div>
              </div>
            </div>
          </div>
          <!-- Botões e Status -->
          <div class="p-col-2">
            <div
              class="box fdobox painelBotoes"
              style="
                 {
                  height: '100%';
                }
              "
            >
              <div class="p-grid">
                <div class="p-col-12">
                  <div
                    class="box"
                    :class=" Variaveis.driveOK.valor === true ? 'habilitado' : 'desabilitado' "
                  >
                    {{
                      Variaveis.driveOK.valor ? "Habilitado" : "Bloqueado"
                    }}
                  </div>
                </div>
                <div class="p-col-12">
                  <div class="box" :class="{ ligado: Variaveis.ligado.valor }">
                    {{ Variaveis.ligado.valor ? "Ligado" : "Desligado" }}
                  </div>
                </div>
                <div class="p-col-6">
                  <Button
                    label="Liga"
                    class="
                      p-button-raised
                      p-button-success
                      p-button-rounded
                      p-button-lg
                    "
                    @mousedown="pulsoOn('liga')"
                    @click="pulsoOff('liga')"
                  />
                </div>
                <div class="p-col-6">
                  <Button
                    label="Desliga"
                    class="
                      p-button-raised
                      p-button-danger
                      p-button-rounded
                      p-button-lg
                    "
                    @mousedown="pulsoOn('desliga')"
                    @click="pulsoOff('desliga')"
                  />
                </div>
                <div class="p-col-12 autoManual">
                  <Button
                    v-if="Variaveis.autoManual.valor"
                    label="Automático"
                    class="
                      p-button-raised
                      p-button-primary
                      p-button-rounded
                      p-button-lg
                    "
                    @click="inverte('autoManual', true)"
                  />
                  <Button
                    v-if="!Variaveis.autoManual.valor"
                    label="Manual"
                    class="
                      p-button-outlined
                      p-button-primary
                      p-button-rounded
                      p-button-lg
                    "
                    @click="inverte('autoManual', false)"
                  />
                </div>
                <div class="p-col-12">
                  <Button
                    label="Avançar"
                    class="
                      p-button-raised
                      p-button-warning
                      p-button-rounded
                      p-button-lg
                    "
                    @mousedown="pulsoOn('avancar')"
                    @click="pulsoOff('avancar')"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      :style="{
        'background-color': 'lightblue',
        width:
          Variaveis.medidaAtual.valor / Variaveis.medidaDest.valor / 10 + '%',
      }"
    >
      {{ Variaveis.medidaAtual.valor }}
    </div>

    <Badge
      size="xlarge"
      v-if="Variaveis.posicaoOK.valor"
      value="Posição OK"
    ></Badge>

    <br />
    <Badge
      size="xlarge"
      :value="Variaveis.avancar.valor ? 'Avançando' : 'Parado'"
      :severity="Variaveis.avancar.valor ? 'warning' : 'success'"
    ></Badge>

    <div class="Rodape">
      <div v-for="item in Falhas" :key="item">{{ item }}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: "App",
  components: { 

  },
  created() {

  },
  methods: {
    minimizar: function () {
      this.$electron.remote.BrowserWindow.getFocusedWindow().minimize();
    },
    atualizaVar: function (variavel, valor) {
      this.Variaveis[variavel]["valor"] = valor;
      this.$socket.emit("gravaVariavel", [
        this.Variaveis[variavel]["endereco"],
        this.Variaveis[variavel]["valor"],
      ]);
    },
    inverte: function (variavel, valor) {
      this.Variaveis[variavel]["valor"] = !valor;
      this.$socket.emit("gravaVariavel", [
        this.Variaveis[variavel]["endereco"],
        this.Variaveis[variavel]["valor"],
      ]);
    },
    pulsoOn: function (variavel) {
      this.$socket.emit("gravaVariavel", [
        this.Variaveis[variavel]["endereco"],
        true,
      ]);
    },
    pulsoOff: function (variavel) {
      this.$socket.emit("gravaVariavel", [
        this.Variaveis[variavel]["endereco"],
        false,
      ]);
    },
    incDecValor: function (variavel, valor) {
      this.Variaveis[variavel]["valor"] = valor;
      this.$socket.emit("gravaVariavel", [
        this.Variaveis[variavel]["endereco"],
        this.Variaveis[variavel]["valor"],
      ]);
      return;
    },
    ligaDesl: function (variavel) {
      this.Variaveis[variavel]["valor"] = !this.Variaveis[variavel]["valor"];
      this.$socket.emit("gravaVariavel", [
        this.Variaveis[variavel]["endereco"],
        this.Variaveis[variavel]["valor"],
      ]);
      return;
    },
  },
  sockets: {
    connect() {
      // Fired when the socket connects.
      this.isConnected = true;
    },

    disconnect() {
      this.isConnected = false;
    },

    // Fired when the server sends something on the "messageChannel" channel.
    messageChannel(data) {
      this.socketMessage = data;
    },

    // Atualiza pacote de variáveis do PLC
    inicializaVar(data) {
      this.Variaveis = data;
    },

    falhas(data) {
      this.Falhas = data;
    },

    atualiza(data) {
      const Variavel = data[0];
      const Valor = data[1];
      this.Variaveis[Variavel]["valor"] = Valor;
    },
  },
  data() {
    return {
      value:  "",
      show:  0,
      options: {
        keyRandomize:  true,
        randomizeClick:  true,
        fixDeleteKey:  false,
      },
      Falhas: {},
      socketMessage: null,
      Variaveis: {
        liga: {
          modulo: "PLCDesbJundiai600",
          endereco: "Entradas_Saidas.I_BotaoLiga",
          casasDec: null,
          valor: null,
          cor: "lightgreen",
          periodoBD: "300",
          periodoAq: "1000",
          maxBD: 30,
        },
        desliga: {
          modulo: "PLCDesbJundiai600",
          endereco: "Entradas_Saidas.I_BotaoDesl",
          casasDec: null,
          valor: null,
          cor: "lightgreen",
          periodoBD: "300",
          periodoAq: "1000",
          maxBD: 30,
        },
        autoManual: {
          modulo: "PLCDesbJundiai600",
          endereco: "Global.mSelAutoManual",
          casasDec: null,
          valor: null,
          cor: "lightgreen",
          periodoBD: "300",
          periodoAq: "1000",
          maxBD: 30,
        },
        ligado: {
          modulo: "PLCDesbJundiai600",
          endereco: "Global.mAlimentadorLigado",
          casasDec: null,
          valor: null,
          cor: "lightgreen",
          periodoBD: "300",
          periodoAq: "1000",
          maxBD: 30,
        },
        avancar: {
          modulo: "PLCDesbJundiai600",
          endereco: "Global.bAvancar",
          casasDec: null,
          valor: false,
          cor: "lightgreen",
          periodoBD: "300",
          periodoAq: "1000",
          maxBD: 30,
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
        },
      },
    };
  },
};
</script>

<style>
/*
.p-knob-value.path {
  stroke: blue;
}
*/

.flexgrid-demo {
  background-color: var(--surface-b);
  color: var(--text-color);
  width: 100%;
}

.autoManual {
  height: 12vh;
}

.painelBotoes {
  padding: 3%;
}

.ligado {
  background-color: lightgreen;
}

.habilitado {
  background-color: lightgreen;
}

.desabilitado {
  background-color: yellow;
}
.fdobox {
  background-color: var(--surface-e);
}

.box {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  margin-top: auto;
  margin-bottom: auto;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-radius: 4px;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
}

.flhVent {
  background-color: red;
}

.flhTemp {
  background-color: red;
}

.dispTempAtual {
  font-size: 7rem;
  color: rgb(201, 250, 151);
  padding-top: 0px;
}

.dispTempSP {
  font-size: 4.5rem;
  color: darkgoldenrod;
}

.box p {
  margin: 0;
}

.red {
  stroke: red;
}

.SubTitulo {
  font-size: 2vh;
  margin-top: 0vh;
  padding-top: 0px;
  margin-bottom: 0px;
}

.Principal {
  height: 100%;
  width: 100%;
}
.Rodape {
  height: auto;
  background-color: var(--surface-a);
  padding: 10px;
  position: absolute;
  bottom: 0;
  width: 100%;
  max-height: 9%;
}

.Falha {
  background-color: red;
  animation: blinker 0.5s linear infinite;
}
@keyframes blinker {
  40% {
    opacity: 0;
  }
}

.Titulo {
  height: 2%;
  background-color: var(--surface-a);
  padding: 0;
  margin-bottom: -20px;
  margin-top: -20px;
}

.Sinotico {
  height: auto;
  max-height: 75%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /*color: #2c3e50;*/
  margin-top: 0;
  padding-top: 0px;
  height: 100%;
}

.app-container {
  text-align: center;
}

body {
  margin: 0;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: var(--surface-b);
  font-family: var(--font-family);
  font-weight: 400;
  color: var(--text-color);
  margin-top: 0px;
  padding-top: 0px;
}
</style>


