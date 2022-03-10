const siteRouter = require('./siteRouter')
function route(app){
    app.get('/',siteRouter)
}
module.exports = route;