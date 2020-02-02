"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const sequelize_1 = __importDefault(require("./sequelize"));
const models_1 = __importDefault(require("./models"));
const api_1 = require("./constants/api");
const authenticate_1 = require("./controllers/authenticate");
const is_auth_1 = require("./middlewares/is-auth");
const start_game_1 = require("./controllers/start-game");
const port = 3000;
const app = express_1.default();
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(cookie_parser_1.default());
sequelize_1.default(app);
models_1.default(app);
app.post('/authenticate', authenticate_1.authenticate);
app.use(is_auth_1.isAuth);
app.post('/games/start', start_game_1.startGame);
app.use('/', (req, res) => res.sendStatus(api_1.BAD_REQUEST_CODE));
app.listen(port, () => console.log(`Server is listening on port ${port}`));
exports.default = app;
//# sourceMappingURL=app.js.map