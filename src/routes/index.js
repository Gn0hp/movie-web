const siteRouter = require('./siteRouter')
const movieRouter = require('./movieRouter')
function route(app){
    app.use('/',siteRouter)
    app.use('/movies',movieRouter)
}
module.exports = route;