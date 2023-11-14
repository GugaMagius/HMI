//const { error } = require('console')
//console.log("INICIANDO IO")

var cors = require('cors')
//const app = require('express')()
var express = require('express')
var cors = require('cors')
var app = express()
app.use(cors());
const http = require('http').createServer(app)
//const { Console } = require('console');
//const io = require('socket.io')(http)
const main = require('../../main')
const plc = require('../PLC/server')
//const PLC = require('../PLC/server')

var socketConectado = false; // Status de conexão do socket



const io = require("socket.io")(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

http.listen(3006, function () {
    console.log("listening on port 3006")
})

io.on('connection', (socket) => {
    console.log("socket iniciado")
    socketConectado = true

    console.log('New connection', socket.id)

    // Envia lista de variáveiis com os valores atualizados
    var Lista = new Promise(
        function (resolve, reject) {
            resolve(main.listaAtualizada())
        })

    Lista.then(function (val) {
        socket.emit("inicializaVar", val)
        //console.log("LISTA ATUALIZADA PELO PLC>>>>> ", val)
    })

    var Falhas = new Promise(
        function (resolve, reject) {
            resolve(main.listaFalhas())
        })

    Falhas.then(function (val) {
        atualizaFalhas(val)
    })

    function atualizaFalhas(lista) {
        socket.emit("falhas", lista)
        //console.log("<<<<<< LISTA FALHAS ENVIADA PELO PLC >>>>> " + JSON.stringify(lista))
    }
    module.exports.atualizaFalhas = atualizaFalhas

    socket.on("pingServer", function (msg) {
        //console.log("Mensagem recebida do cliente: " + msg)
        socket.emit("messageChannel", "Ping recebido")
    })

    socket.on("gravaVariavel", function (dados) {
        //console.log("valor recebido do cliente: ", JSON.stringify(dados))
        plc.srvGravaVariavel(dados[0],dados[1]).then(
            function(val) {
                //console.log("Resposta recebido da gravação do PLC ",val)
            }
        )
        
    })

    var atualizaCliente = function(Variavel, val, cor) {

        return new Promise(
            function (resolve, reject) {
                //console.log("Iniciando atualização no cliente da variavel: " + Variavel[0] + " - Valor: " + val + " - Cor: " + cor);

                try {
                    io.emit('atualiza', [Variavel[0], val, cor]);

                } catch (err) {
                    //console.error("falha ao conectar a cliente: " + err);
                    reject("falha ao conectar a cliente: " + err);
                }
                finally {
                    //console.log("Atualizado variável: " + Variavel[1].endereco + " - valor: " + val);
                    resolve("Atualizado variável: " + Variavel[1].endereco + " - valor: " + val);
                }
            }
        )
    }
    module.exports.atualizaCliente = atualizaCliente

    
})


module.exports.io = io
