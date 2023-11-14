
const ads = require('ads-client');
var main = require('../../main')



//console.log("INICIANDO PLC")

/*

// Configurações do Target do CLP para acesso via ADS (ADS precisa estar instalado no PC)
const clientPLCEstufaPo = new ads.Client({
    targetAmsNetId: '5.42.86.72.1.1', // Ecoat, //'5.88.201.147.1.1' Pintura pó,
    targetAdsPort: 851,
    autoReconnect: false
});

*/


// Opção para conexão sem o ADS da Beckhoff
const clientPLCEstufaPo = new ads.Client({
    localAmsNetId: '10.41.1.171.1.1',        //Posto manutenção > '10.41.0.39.1.1' Pintura líquida :> '10.41.1.71.1.1' Can be anything but needs to be in PLC StaticRoutes.xml file
    localAdsPort: 32750,                    //Can be anything that is not used
    targetAmsNetId: '192.168.1.175.1.1',       // Target CLP Ecoat
    targetAdsPort: 851,
    routerAddress: '10.41.1.175',            //PLC ip address
    routerTcpPort: 48898,                   //PLC needs to have this port opened. Test disabling all firewalls if problems
    allowHalfOpen: true
})



var recon // Variavel para Timeout de reconexão
var iVerificaStatus // Variavel para Interval de verifica-status

// Reconecta CLP após o período determinado
function reconectar(tempo) {
    console.log("Iniciando contagem de tempo para reconectar o PLC em ", tempo / 1000, "segundos")
    recon = setTimeout(conectarCLP, tempo);
}


// Inicia conexão com o CLP
conectarCLP();


// MONITOR DO STATUS DO CLP
async function verificaStatus() {
    var resposta = '';
    try {
        resposta = await clientPLCEstufaPo.readPlcRuntimeState()
        //console.log("resposta do status ", resposta)
    } catch (err) {
        console.log("Falha ao verificar o status do PLC: " + err)
        reconectar(30000)
        clearInterval(iVerificaStatus)
        return
    }
}


async function srvGravaVariavel(variavel, valor) {
    return new Promise(
        async function (resolve, reject) {
            //console.log("iniciando gravação no plc.... ", variavel, valor)
            try {
                const res = await clientPLCEstufaPo.writeSymbol(variavel, valor);
                resolve(res);
            } catch (err) {
                console.log("falha ao gravar variável: ", variavel, err)
                reject(err)
            }


        }
    )
}
module.exports.srvGravaVariavel = srvGravaVariavel

// Conexão com o CLP
async function conectarCLP() {

    clientPLCEstufaPo.connect()
        .then((resp) => {
            // Inicia instância para monitorar as variáveis do processo e atualizar os valores 
            console.log("CONEXÃO COM O CLP REALIZADA COM SUCESSO!!! ")
            clearTimeout(recon)

            iVerificaStatus = setInterval(verificaStatus, 1000); // Inicia verificação de status periódica

            //console.log(resp)



            // LEITURA DAS VARIAVEIS DO CLP (CRIAR SUBSCRIÇÃO DAS VARIÁVEIS)
            // Varre variáveis para aquisção com o CLP
            main.listaAtualizada().then(
                function (val) {
                    var Variaveis = val
                    //console.log("INICIANDO FOR PARA VARIAVEIS DO CLP: "+JSON.stringify(Variaveis))
                    for (const Variavel of Object.entries(Variaveis)) {
                        if (Variavel[1].modulo === "PLCDesbJundiai600") {
                            //console.log("Modulo: " + JSON.stringify(Variavel[1]))
                            iniciarVariaveis(Variavel)
                        }
                    }
                    //console.log("LISTA DE VARIAVEIS: " + JSON.stringify(val))
                    return val
                }
            )


            // Cria subscrição das variáveis para atualização pelo CLP 
            function iniciarVariaveis(iVariavel) {

                // eslint-disable-next-line no-unused-vars
                let subscription = clientPLCEstufaPo.subscribe(iVariavel[1].endereco, (data, sub) => {
                    let tVariavel = iVariavel
                    //console.log("VARIAVEL RECEBIDA: " + JSON.stringify(iVariavel))
                    //Note: The sub parameter is the same as returned by clientPLCEstufaPo.subcribe()
                    console.log(`${data.timeStamp}: Value OF ${tVariavel[1].endereco} changed to ${data.value}`);
                    try {
                        main.tratDados(tVariavel, data.value);
                    } catch (err) {
                        console.log("falha ao atualizar variavel", tVariavel[0], " Erro: ", err)
                    }

                    // Simulação Prensa
                    if (tVariavel[0] === "startPrensa" && data.value === true) {
                        clientPLCEstufaPo.writeSymbol("Entradas_Saidas.I_PosPrensaAlim", false)

                        let tempoGolpe = setTimeout(function () {
                            clientPLCEstufaPo.writeSymbol("Entradas_Saidas.I_PMI_Prensa", true)
                            let tempoPMS = setTimeout(function () {
                                clientPLCEstufaPo.writeSymbol("Entradas_Saidas.I_PMI_Prensa", false)
                                clientPLCEstufaPo.writeSymbol("Entradas_Saidas.I_PosPrensaAlim", true)
                            }, 2000)
                        }, 2000)
                    }

                    //console.log("VARIAVEL INSTANCIADA: " + JSON.stringify(tVariavel))
                }, parseInt(iVariavel[1].periodoAq))
                    .catch(err => {
                        let msgErro = 'Falha ao ler variável: ' + iVariavel[1].endereco + err
                        console.log(msgErro)
                        return
                    })
            }
        })


        .catch((erro) => {
            console.log("Falha ao conectar ao CLP " + erro)
            //clientPLCEstufaPo.disconnect();
            console.log(" Iniciar nova tentativa de conexão em 15 segundos... ")
            reconectar(15000)
            return
        })
}



module.exports
