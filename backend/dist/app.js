"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jokosetiawan = void 0;
const functions = require('firebase-functions');
const express_1 = __importDefault(require("express"));
const routes = express_1.default.Router();
require("dotenv/config");
const body_parser_1 = __importDefault(require("body-parser"));
const db_connection_1 = require("./config/db.connection");
const transaction_route_1 = __importDefault(require("./routes/transaction.route"));
const helmet_1 = __importDefault(require("helmet"));
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, helmet_1.default)());
app.use(helmet_1.default.frameguard({ action: 'deny' }));
app.use(helmet_1.default.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'"],
        imgSrc: ["'self'"],
        frameSrc: ["'self'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: ["'self'", "https:"]
    }
}));
db_connection_1.db.connect(function (err) {
    if (err) {
        console.log(err);
        throw err;
    }
    console.log("DB Connected!");
});
app.use((req, res, next) => {
    res.header('X-Frame-Options', 'DENY');
    next();
});
app.use(body_parser_1.default.json());
app.use((req, res, next) => {
    const allowedOrigins = [
        'https://week-17-jokosetiawanfe.web.app/',
        'https://clinetx-week15.netlify.app',
    ];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
        if (origin === 'https://week-17-jokosetiawanfe.web.app/') {
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        }
        else if (origin === 'https://clinetx-week15.netlify.app') {
            res.header('Access-Control-Allow-Methods', 'GET, POST');
        }
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        4;
    }
    next();
});
app.use(transaction_route_1.default);
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
exports.jokosetiawan = functions.https.onRequest(app);
