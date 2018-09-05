import express from 'express';
import datasource from './infra/datasource';
import config from './infra/config';

const app = express()
app.config = config
app.datasource = datasource(app);

app.get('/', (req, res) => {
    res.send('alo alo w brazil')

})

export default app;