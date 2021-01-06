const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let commentSchema = new Schema({
    text: {type: String},
    author: {type: Schema.Types.ObjectId, ref: "User"},
    articleId: {type: Schema.Types.ObjectId,required: true,ref:"Article"}
},{timestamps: true});

module.exports = mongoose.model("Comment",commentSchema);