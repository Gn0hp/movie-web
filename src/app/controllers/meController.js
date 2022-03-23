class MeController {
    //:id
    mePage(req,res){
        res.render('me')
    }
}

module.exports = new MeController();