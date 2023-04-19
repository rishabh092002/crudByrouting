const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mainRouter = require("./Router/mainRouter")
const session = require("express-session");
const fileUpload = require("express-fileupload");

app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(fileUpload());
app.use(session({
    secret: "testhj280",
    resave: false,
    saveUninitialized: false
}))

app.use('/', mainRouter);

const port = 3001;
app.listen(port,function(){
    console.log(`server started at port,${port}`);
});