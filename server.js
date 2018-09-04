const express = require('express')
const app = express()


app.get('/', (req, res) => {
    res.send('alo alo w brazil')
})

const port = 3200
app.listen(port, () => {
    console.log(`Servidor subiu na porta ${port}`)
    console.log(`Acesse em: http://localhost:${port}`)
    console.log(`Para derrubar use CTRL + C`)
})