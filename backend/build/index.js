"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const user_1 = __importDefault(require("./routes/user"));
const auth_1 = __importDefault(require("./routes/auth"));
// initialize app
const app = (0, express_1.default)();
process.env.NODE_CONFIG_DIR = './config';
// connect to database
(0, db_1.default)();
// http body parser
app.use(express_1.default.json());
// http policy
app.use((0, cors_1.default)());
app.get('/', (req, res) => res.send('API Running'));
// routers
app.use('/api/user', user_1.default);
app.use('/api/auth', auth_1.default);
// defining the apps port with which to communicate with it
const PORT = process.env.PORT || 5000;
// listend on a port for communication
app.listen(PORT, () => console.log(`Server Started on Port: ${PORT}`));
