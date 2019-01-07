import app from "./src/app";

const port = 3200 || process.env.port

app.listen(port, () => {
    console.log(`Servidor subiu na porta ${port}`)
    console.log(`Acesse em: http://localhost:${port}`)
    console.log(`Para derrubar use CTRL + C`)
})