import express from 'express';
import datasource from './infra/datasource';
import config from './infra/config';
import consign from 'consign';

const app = express()
app.config = config
app.datasource = datasource(app);

// Autoload Routes
consign()
    .include('./src/routes')
    .into(app)


export default app;