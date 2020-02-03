import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { BAD_GATEWAY } from 'http-status-codes';

import sequelize from './sequelize';
import models from './models';
import controllers from './controllers';

import { ERRORS } from './constants';
const { SOMETHING_WENT_WRONG } = ERRORS;

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

sequelize(app);
models(app);
controllers(app);

app.use((err: any, req: any, res: any, next: any) => res.status(BAD_GATEWAY).send(SOMETHING_WENT_WRONG));

export default app;
