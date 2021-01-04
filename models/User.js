const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

let UserSchema = new Schema({
    name : {type: String, trim: true, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
},{timestamps: true});

UserSchema.pre("save", function(next) {
    if(this.password) {
        bcrypt.hash(this.password, 12, (err,hash)=> {
            if(err) return next(err);
            this.password = hash;
            next();
        });
    } else next();
})

module.exports = mongoose.model("User",UserSchema);