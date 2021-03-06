// all requires
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require('connect-mongo')(session);
//connecting to database
mongoose.connect("mongodb://localhost/blog",{ useNewUrlParser: true, useUnifiedTopology: true},(err)=> {
    console.log(err ? err : "connected to database");
})

// app instansiate
const app = express();

//middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({
    secret: "any random text",
    saveUninitialized : true,
    resave: true,
    name: "userId",
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}))
//views
app.set("view engine","ejs");
app.set("views",path.join(__dirname, "views"));
//routing middleware
app.use("/",require("./routes/index"));
app.use("/article",require("./routes/article"));
app.use("/users",require("./routes/user"));

//error handler middlewares

//404 error
app.use((req,res,next)=> {
    res.status(404).send("Page not Found")
});

//custom error handler middleware
app.use((err,req,res,next)=> {
    res.json(err);
})

//listener port
app.listen(4000,()=> {
    console.log("server is listening on port 4000");
});