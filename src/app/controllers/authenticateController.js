const User=require('../models/User')
const session= require("express-session")
class AuthenticateController{
    login(req,res){
        res.render('authenticate/login');
    }
    signup(req,res){
        res.render('authenticate/signup');
    }
    createNewUserAccount(req,res,next){
        const user=req.body;
        User.findOne({email:user.emailSignUp})
            .then(data=>{
                if(!data) {
                    const toDb= new User({
                        email: user.emailSignUp,
                        password: user.passwordSignUp,
                    });
                    toDb.save();
                    
                    res.redirect('/')
                }
                else{
                   res.status(402).send('Email already existed')
                }
            })
            .catch(err=>{
                console.log(err);
            })
    }
    loginHandle(req,res,next){
        const user=req.body;
        User.findOne({email:user.emailLogin})
            .then(data=>{
                if(data){
                    if(data.password===user.passwordLogin){
                        req.session.regenerate(error=>{
                            if(error) {
                                console.log(error)
                                return res.status(500).send('Unexpected error occured')
                            }
                            req.session.user= {name:user.emailLogin};
                            //console.log(req.session.user.name)
                            
                        })
                        res.redirect('/')
                    }
                    else{
                        res.status(402).send('Wrong password')
                    }
                   
                }
                else{
                    res.status(402).send('Email not found')
                }
            })
            .catch(err=>next)

        
    }
}   
    

module.exports = new AuthenticateController();  