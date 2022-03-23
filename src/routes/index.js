const siteRouter = require('./siteRouter')
const movieRouter = require('./movieRouter')
const authenticateRouter = require('./authenticateRouter')
const ptitRouter = require('./ptitRouter')
const meRouter = require('./meRouter')

function route(app){
    app.use('/',siteRouter)
    app.use('/movies',movieRouter)
    app.use('/authenticate',authenticateRouter);
    app.use('/ptit',ptitRouter);
    app.use('/me',meRouter);
}
module.exports = route;