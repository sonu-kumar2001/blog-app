const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.get("/register",(req,res,next)=> {
    res.render("registerForm");
});

router.post("/register",(req,res,next)=> {
    User.create(req.body,(err,createdUser)=> {
        if(err) next(err);
        res.redirect("/users/login");
    });
});

router.get("/login",(req,res,next)=> {
    res.render("loginForm");
});

router.post("/login",(req,res,next)=> {
    var {email,password} = req.body;
    if(!email || !password) return res.redirect("/users/login");
    User.findOne({email},(err,user)=> {
        if(err) return next(err);
        bcrypt.compare(password,user.password,(err,result)=> {
            if(err) return next(err);
            if(user && result) {
                req.session.userId = user._id;
                console.log(req.session);
                res.redirect("/");
            } else res.redirect("/users/login");
        });
    });
    
});

module.exports = router
