import express from 'express';
import datasource from './infra/datasource';
import config from './infra/config';
import consign from 'consign';
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()

// Middlewares
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json

// Database setup
app.config = config
app.datasource = datasource(app);

// Autoload Routes
consign()
    .include('./src/routes')
    .into(app)


export default app;