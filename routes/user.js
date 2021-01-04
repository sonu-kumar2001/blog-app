const express = require("express");
const router = express.Router();

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
})

module.exports = router
