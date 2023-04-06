import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import http from 'http';
// import routes from './src/routes/index.js';
import cookieParser from "cookie-parser";
import "dotenv/config";

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use('/api/v1', routes);

const port = process.env.PORT;

const server = http.createServer(app);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
