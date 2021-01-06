const User = require("../models/User");

module.exports = {
    verifiedLoggedInUser : (req,res,next) => {
        if(req.session && req.session.userId) {
            next();
        } else {
            res.redirect("/users/login");
        } 
    },
    currentLoggedInUser: (req,res,next)=> {
        if(req.session && req.session.userId) {
            let currentUser = req.session.userId
            User.findById(currentUser,"name,email",(err,user)=> {
                if (err) return next(err);
                req.user = user;
            })
            next();
        } else {
            req.user = null;
        }
    }
}