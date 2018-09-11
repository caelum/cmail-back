module.exports = (app) => {
    app.get('/users', (req, res) => {
        res.send([{
            texto: 'alo alo w brazil'
        }])
    })
}