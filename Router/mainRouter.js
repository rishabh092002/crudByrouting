const express = require("express");
const app = express()
const AuthenticateController = require("../Controller/AuthenticateController");
const BlogController = require("../Controller/BlogController");

app.get('/',function(req,res){
    let page = {
        title: "home page",
        pageName: "home",
        isUserLoggedIn: false
    }
    if(req.session.isUserLoggedIn){
        page.isUserLoggedIn = true;
    }
    res.render("template",page);
});

app.get('/register',AuthenticateController.signUp);

app.post('/register',AuthenticateController.register);

app.get('/login',AuthenticateController.login);

app.post('/login',AuthenticateController.userLogin);

app.get('/blog', BlogController.getBLog);

app.post('/blog',BlogController.createBlog);

app.get('/all-blogs',BlogController.allBlogs);

app.get('/edit-blog', BlogController.editBlog);

app.post('/update-blog',BlogController.update);

app.get('/delete',BlogController.deleteBlog);

app.get('/my-blogs',BlogController.myBlogs)

module.exports = app;