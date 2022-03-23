const siteRouter = require('./siteRouter')
const movieRouter = require('./movieRouter')
const authenticateRouter = require('./authenticateRouter')

function route(app){
    app.use('/',siteRouter)
    app.use('/movies',movieRouter)
    app.use('/authenticate',authenticateRouter);
}
module.exports = route;