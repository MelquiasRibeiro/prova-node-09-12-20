import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Youch from 'youch';
// eslint-disable-next-line import/no-unresolved
import 'express-async-errors';
import Routes from './routes';
import './database';

class APP {
    
    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
        this.exceptionHandler();
        this.ambient();
    }

    ambient(){
           process.env.NODE_ENV === "test" ? ".env.test" : ".env"       
    }
    
    middlewares() {
        this.server.use(cors());
        this.server.use(express.json());
    }

    routes() {
        this.server.use(Routes);
    }

    exceptionHandler() {
        this.server.use(async (err, req, res, next) => {
            if (process.env.NODE_ENV === 'development') {
                const errors = await new Youch(err, req).toJSON();

                return res.status(500).json(errors);
            }
            return res.status(500).json({ error: 'internal server error' });
        });
    }
}

export default new APP().server;