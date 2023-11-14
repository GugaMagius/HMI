var Variaveis = require('./Eqptos').Variaveis;
var socketFl = require('./api/socket/server');

const corOK = "Lightgreen"
const corAlerta = "#ffff66"
const corFalha = "#ff5c33"

//console.log("INICIANDO MAIN")

//var SQL = require('../BD/server')

var Falhas = {}; // Lista de falhas

function listaAtualizada() {
    //console.log("iniciando PROMISE para enviar Variaveis")
    return new Promise(
        function (resolve, reject) {
            resolve(Variaveis)
        }
    )
}

module.exports.listaAtualizada = listaAtualizada


function listaFalhas() {
    return Falhas
}
module.exports.listaFalhas = listaFalhas


// Trata dados após alteração de valores
function tratDados(Variavel, valor) {

    try {

        // Verifica se precisa enviar mensagem (Telefone, e-mail ou SMS) e atualiza também a lista de falhas presente
        if ((Variaveis[Variavel[0]]["mensagem"] !== undefined) && (Variaveis[Variavel[0]]["flagAviso"] === false) && ((valor === true) || ((valor !== false) && (Variavel[1].cor === corFalha)))) {

            // atualiza mensagem de falha na tela
            Falhas[Variavel[0]] = Variaveis[Variavel[0]]["mensagem"];

            if (socketFl.socketConectado === true) {
                socketFl.atualizaFalhas(Falhas)
            }


        } else if ((Variaveis[Variavel[0]]["mensagem"] !== undefined) && ((valor === false) || ((valor !== true) && (Variavel[1].cor !== corFalha)))) {

            delete Falhas[Variavel[0]]; // excluí falha da lista

            if (socketFl.socketConectado === true) {
                socketFl.atualizaFalhas(Falhas)
            }
        }


        // Atualiza valor com quantidades de pontos decimais pré-configurados
        if (Variaveis[Variavel[0]]["casasDec"] != null) {
            Variaveis[Variavel[0]]["valor"] = valor.toFixed(Variaveis[Variavel[0]]["casasDec"])
        } else {
            Variaveis[Variavel[0]]["valor"] = valor
        }

    } finally {
        // ENVIA valor atualizado para os clientes

        try {
            socketFl.atualizaCliente(Variavel, valor, undefined).then(
                function (res) {
                    //console.log("RESPOSTA DO SOCKET: " + res)
                }
            )

        } catch (err) {
            //console.log("erro ao atualizar o cliente: Verificar se existe algum cliente conectado!")
        }

    }


}
module.exports.tratDados = tratDados


