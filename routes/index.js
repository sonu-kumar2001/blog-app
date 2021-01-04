const express = require("express");
const router = express.Router();

const Article = require("../models/Article");

//Routes
// router.get("/",(req,res)=> {
//     res.render('index');
// });

router.get("/",(req,res,next)=> {
    Article.find({},(err,articles)=> {
        if(err) return next(err);
        res.render("articleList",{articles});
    });
});

module.exports = router;
