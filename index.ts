import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import http from 'http';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import 'dotenv/config';
import routes from './src/routes/index.js';
import errorHandler from './src/middlewares/errorHandler.middleware';

const app: Express = express();

// enable CORS with various options
app.use(cors());

// It parses incoming requests with JSON payloads
app.use(express.json());

// It parses incoming requests with urlencoded payloads
app.use(express.urlencoded({ extended: false }));

// it parses Cookie header and populate req.cookies with an object keyed by the cookie names
app.use(cookieParser());

// Logger
app.use(morgan('combined'));

app.use('/api/v1', routes);


// custom error handler middleware (should be last one)
app.use(errorHandler);

const port = process.env.PORT;
const server = http.createServer(app);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to TlkBuddy.ai Server 😍');
});

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
