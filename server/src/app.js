// import express
import express from 'express'
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';

import apiVersionOne from './routes/apiV1.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// initiatize express
const app = express();
const corsOption = {
    origin : 'http://localhost:3000'
}

app.use(cors(corsOption));
app.use(morgan('combined'));
/*
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    next();
  });

*/

app.use(express.static(path.join(__dirname, '..', 'public')))

app.use(express.json());

app.use('/v1', apiVersionOne);

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

export default app;