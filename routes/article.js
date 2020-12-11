const express = require("express");
const router = express.Router();

const Article = require("../models/Article");

//render article form
router.get("/new",(req,res,next)=> {
    res.render("articleCreateForm");
})

//create articles
router.post("/",(req,res,next)=> {
    Article.create(req.body,(err,createdArticle)=> {
        if(err) return next(err);
        res.redirect("/");
    })
});

// find one article
router.get("/:id",(req,res,next)=> {
    let id = req.params.id;
    Article.findById(id,(err,article)=> {
        if(err) return next(err);
        res.render("articleDetails",{article});
    });
});
// edit article routes
router.get("/:id/edit",(req,res,next)=> {
    let id = req.params.id
    Article.findById(id,(err,article)=> {
        if(err) return next(err);
        res.render("editedForm",{article});
    })
})
//update article
router.post("/:id",(req,res,next)=> {
    let id = req.params.id;
    Article.findByIdAndUpdate(id,req.body,{new:true},(err,updatedArticle)=> {
        if(err) return next(err);
        res.redirect("/");
    });
});
// delete article
router.get("/:id/delete",(req,res,next)=> {
    let id = req.params.id;
    Article.findByIdAndDelete(id,(err,deletedArticle)=> {
        if(err) return next(err);
        res.redirect(`/`);
    });
});

module.exports = router;
