import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import Controller from '@/utils/interfaces/controller.interface';
import ErrorMiddleware from '@/middlewares/error.middleware';
import compression from 'compression';

class App {
    public express: Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {
        this.express = express();
        this.port = port;

        this.initializeDatabaseConnection();
        this.initializeMiddleware();
        this.initializeControllers(controllers);
        this.initializeErrorHandler();
    }

    private initializeMiddleware(): void {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(compression());
    }

    private initializeControllers(controllers: Controller[]): void {
        controllers.forEach((c: Controller) => {
            this.express.use('/api', c.router);
        })
    }

    private initializeErrorHandler(): void {
        this.express.use(ErrorMiddleware);
    }

    private initializeDatabaseConnection(): void {
        const { MONGO_USER, MONGO_PASS, MONGO_PATH } = process.env;
        mongoose.connect(`mongodb://${MONGO_PATH}`, {
            user: MONGO_USER,
            pass: MONGO_PASS
        })
    }

    public listen(): void {
        this.express.listen(this.port, () => {
            console.log('App running on => ', `http://localhost:${this.port}`)
        });
    }
}

export default App;
