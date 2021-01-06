const express = require("express");
const router = express.Router();

const Article = require("../models/Article");
const Comment = require("../models/Comment");
const auth = require("../middlewares/auth");
const session = require("express-session");

//render article form
router.get("/new",auth.verifiedLoggedInUser,(req,res,next)=> {
    res.render("articleCreateForm");
})

//create articles
router.post("/",auth.verifiedLoggedInUser,(req,res,next)=> {
    req.body.author = req.session.userId
    Article.create(req.body,(err,createdArticle)=> {
        if(err) return next(err);
        res.redirect("/");
    })
});

// find one article

// router.get("/:id",(req,res,next)=> {
//     let id = req.params.id;
//     Article.findById(id,(err,article)=> {
//         if(err) return next(err);
//         Comment.find({articleId: id},(err,comment)=> {
//             if(err) next(err);
//             res.render("articleDetails",{article,comment});
//         })
//     });
// });
router.get("/:id",auth.currentLoggedInUser,(req,res,next)=> {
    let id = req.params.id;
    Article.findById(id).populate("comments").exec((err,article)=> {
        if(err) next(err);
        res.render("articleDetails",{article,user: req.user});
    });
});
// edit article routes
router.get("/:id/edit",auth.verifiedLoggedInUser,(req,res,next)=> {
    let id = req.params.id;
        Article.findById(id,(err,article)=> {
            if(err) return next(err);
            console.log(req.session.userId, article.author);
            if(req.session.userId == article.author) {  
                res.render("editedForm",{article});
            }
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
router.get("/:id/delete",auth.verifiedLoggedInUser,(req,res,next)=> {
    let id = req.params.id;
        Article.findByIdAndDelete(id,(err,deletedArticle)=> {
            if(req.session.userId === deletedArticle.author) {
                if(err) return next(err);
                res.redirect(`/`);
            }
        });
});

//routes for creating comments
router.post("/:articleId/comments",auth.verifiedLoggedInUser,(req,res,next)=> {
    let articleId = req.params.articleId;
    req.body.articleId = articleId;
    req.body.author = req.session.userId;
    Comment.create(req.body,(err,comment)=> {
        if(err) return next(err);
        Article.findByIdAndUpdate(articleId,{$push: {comments: comment._id}},(err,article)=> {
            if(err) return next(err);
            res.redirect("/article/" + articleId);
        })
    })
})

module.exports = router;
