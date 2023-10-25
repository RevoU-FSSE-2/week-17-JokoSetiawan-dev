const functions = require('firebase-functions');
import express, { Express, Request, Response, NextFunction } from "express";
const routes = express.Router();
import "dotenv/config";
import bodyParser from "body-parser";
import { db } from "./config/db.connection";
import transactionRoutes from "./routes/transaction.route";
import cors from "cors"
import corsClientx from "./middlewares/corsx.middleware";
import corsClienty from "./middlewares/corsy.middleware";
import helmet from "helmet";


const app = express();
const port = process.env.PORT;

app.use(helmet())

app.use(helmet.frameguard({ action: 'deny' }))

app.use(helmet.contentSecurityPolicy({
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


db.connect(function (err) {
  if (err) {
    console.log(err)
    throw err;
  }
  console.log("DB Connected!");
});


app.use((req, res, next) => {
  res.header('X-Frame-Options', 'DENY');
  next();
});

app.use(bodyParser.json());


app.use((req: Request, res: Response, next: NextFunction) => {
  const allowedOrigins: string[] = [
    'https://week-17-jokosetiawanfe.web.app/',
    'https://clinetx-week15.netlify.app',
  ];
  const origin: string | undefined = req.headers.origin as string;
  

  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);

    if (origin === 'https://week-17-jokosetiawanfe.web.app/') {
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    } else if (origin === 'https://clinetx-week15.netlify.app') {
      res.header('Access-Control-Allow-Methods', 'GET, POST');
    }

    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');4
  }

  next();
});


app.use(transactionRoutes);


// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

export const jokosetiawan = functions.https.onRequest(app)
