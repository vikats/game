import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import sequelize from './sequelize';
import models from './models';
import { BAD_REQUEST_CODE } from './constants/api';
import { authenticate } from './controllers/authenticate';
import { isAuth } from './middlewares/is-auth';
import { startGame } from './controllers/start-game';
import {endGame} from './controllers/end-game';

const port = 3000;

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

sequelize(app);
models(app);

app.post('/authenticate', authenticate);
app.use(isAuth);
app.post('/games/start', startGame);
app.post('/games/end', endGame);
app.use('/', (req, res) => res.sendStatus(BAD_REQUEST_CODE));

app.listen(port, () => console.log(`Server is listening on port ${ port }`));

export default app;
