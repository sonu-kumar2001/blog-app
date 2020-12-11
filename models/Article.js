const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: {type:String,required: true, trim:true},
    description: {type:String,minlength: 5},
    tags: [{type:String}],
    likes: {type: Number,default:0},
    published: {type: String,default:false}
},{timestamps: true});

const Article = mongoose.model("Article",articleSchema);

module.exports = Article;