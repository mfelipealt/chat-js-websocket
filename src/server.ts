import express, { Application } from 'express';
import http from 'http';
import { Server } from 'socket.io';

class App{

    private app: Application
    private http: http.Server
    private io: Server

    constructor(){
        this.app = express()
        //criando o servidor com o app
        this.http = http.createServer(this.app)
        //iniciando o socket.io, uma instância 
        this.io = new Server(this.http)
        //Iniciando no construtor ao inves de chamar la no app
        this.listenSocket();
        this.setupRoutes();
    } 

    listenServer(){
        //Vai ficar na porta /3000
        this.http.listen(3000, () => console.log('Server rodando'))
    }

    listenSocket(){
        this.io.on('connection', (socket) =>{
            console.log('user conectado', socket.id)

            //Esta ouvindo o evento de message e então emitindo o evento
            socket.on('message', (msg) => {
                console.log('Mensagem recebida no servidor')
                this.io.emit('message', msg)
            })
        })

    }

    setupRoutes(){
        this.app.get('/', (req, res) => {
            res.sendFile(__dirname + '/index.html')
        })
    }
}

const app = new App()

app.listenServer()
// app.listenSocket()