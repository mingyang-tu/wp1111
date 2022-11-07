import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './db';
import routes from './routes';

const app = express();

// init middleware
app.use(cors());

// Connect DB
db.connect();

// Parses the text as JSON and exposes the resulting object on req.body.
app.use(bodyParser.json());

// define routes
app.use('/', routes);

// define server
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
});