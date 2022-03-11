class MovieController {
    //:id
    getMovie(req,res){
        res.render('movies/movie',{
            key: req.params.id,
        })
    }
}

module.exports = new MovieController();