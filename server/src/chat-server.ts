import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';
import * as jwt from 'jsonwebtoken';
import { Message } from './model';

export class ChatServer {
    public static readonly PORT:number = 8080;
    private app: express.Application;
    private server: Server;
    private io: SocketIO.Server;
    private port: string | number;

    constructor() {
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
    }

    private createApp(): void {
        this.app = express();
    }

    private createServer(): void {
        this.server = createServer(this.app);
    }

    private config(): void {
        this.port = process.env.PORT || ChatServer.PORT;
    }

    private sockets(): void {
        this.io = socketIo(this.server);
    }

    private listen(): void {
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });

        this.io.on('connect', (socket: any) => {
            console.log('Connected client on port %s.', this.port);
                socket.on('message', (data : any) => {
                								try {
                																this.jwtCheckthenEmit('message',data);
																								}catch(e){
                																return e.message;
																								}
                 });

																socket.on('login', (data : any) => {
																								try {
																																this.jwtCheckthenEmit('login',data);
																								}catch(e){
																																return e.message;
																								}

																});

																socket.on('logout', (data : any) => {
																								try {
																																this.jwtCheckthenEmit('logout',data);
																								}catch(e){
																																return e.message;
																								}

																});
																socket.on('disconnect', () => {
																								console.log('Client disconnected');
																});

        });
    }

    public jwtCheckthenEmit( type : string, data: any) {
												this.checkJwt(data.token);
												console.log('[server]('+type+'): %s', JSON.stringify(data.dataContent));
												this.io.emit(type, data.dataContent);
				}

    public checkJwt(token: string) : any {
												//if (token == null) return new Error('Authentication error');
												try {
																				jwt.verify(token, 'fahedd');
												}catch(err){
																				throw new Error('invalid Token');
												}
				}

    public getApp(): express.Application {
        return this.app;
    }
}

export class InvalidToken{

								private message : string;

								constructor(message: string) {
																this.message = message;
								}

}