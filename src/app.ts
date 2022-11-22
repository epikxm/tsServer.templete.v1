// 타입스크립트 기반 클래스 형식으로 Express 서버 만들기
// SSL 적용

import http from "http";
import https from "https";
import express, { Application, Request, Response, NextFunction } from "express"; // https://www.npmjs.com/package/express
import fs from "fs";
import bodyParser from "body-parser"; // https://www.npmjs.com/package/body-parser
import compression from "compression"; // https://www.npmjs.com/package/compression
import timeout from "connect-timeout"; // https://www.npmjs.com/package/connect-timeout
import helmet from "helmet"; // https://www.npmjs.com/package/helmet
import cors from "cors"; // https://www.npmjs.com/package/cors
import dotenv from "dotenv"; // https://www.npmjs.com/package/dotenv

// routes
import messagesRouter from "./routes/messages";

class ExpressServer {
  // #ssl_options = {
  //     ca: fs.readFileSync('./ssl/DigiCertCA.pem'),
  //     key: fs.readFileSync('./ssl/newkey.pem'),
  //     cert: fs.readFileSync('./ssl/cert.pem')
  // };

    #WEB_PORT = 3001;
    #SSL_PORT = 443;
    app: express.Application = express();

    httpServer: http.Server;
    // httpsServer: https.Server;

    constructor() {
        this.app = express();
        this.#config();
        this.#router();

        // #HTTP
        // this.app.listen(this.#WEB_PORT, () =>
        //     console.log(`HTTP web server listening on port 3001`)
        // );
        
        // #HTTP
        this.httpServer = http.createServer(this.app).listen(this.#WEB_PORT, () => {
            console.log(`HTTP web server listening on port ${this.#WEB_PORT}`)
        });
        
        // #SSL
        // this.httpsServer = https.createServer(this.#ssl_options, this.app).listen(this.#SSL_PORT, () => {
        //     console.log(`HTTPS: Express listening on port ${this.#SSL_PORT}`);
        // });
    }
    
    middleware = (req: Request, res: Response, next: NextFunction) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, POST");
        res.header("Access-Control-Allow-Headers", "*" /* "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept" */);
        next();
    };

    #config = (): void => {
        dotenv.config(); // process.env Object Can Used.
        this.app.disable("x-powered-by");
        this.app.use(bodyParser.urlencoded({ extended: false, limit: "1mb" }));
        this.app.use(bodyParser.json({ limit: "1mb" }));
        this.app.use(compression());
        this.app.use(timeout("10s"));
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(this.middleware);
    };

    #router = (): void => {
        this.app.use('/messages', messagesRouter);
    };
}

const server = new ExpressServer();

server.app.get("/", (req: express.Request, res: express.Response) => {
    res.send("hello world");
});

process.on("uncaughtException", (error: Error) => {
    console.log("uncaughtException", error);
});