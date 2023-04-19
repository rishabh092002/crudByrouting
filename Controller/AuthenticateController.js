const AuthenticateModel = require("../Model/AuthenticateModel");
const joi = require('joi')

class AuthenticateController {
    constructor(){}

    async signUp(req,res){
        let page = {
            title: "signUp page",
            pageName: "register",
            status: "",
            message: "",
            isUserLoggedIn: false
        }
        if(req.session.isUserLoggedIn){
            page.isUserLoggedIn = true;
        }
        if(req.session.status && req.session.message){
            page.status = req.session.status;
            page.message = req.session.message;
            delete req.session.status,req.session.message;
        }
        res.render("template",page)
    }

    async register(req,res){
        try {
            const Schema = joi.object({
                fullName: joi.string().required(),
                contact: joi.number().required(),
                email: joi.string().required(),
                password: joi.string().required(),
            })
            const validateRes = Schema.validate(req.body)
            if(validateRes && validateRes.error && validateRes.error.details){
                req.session.status = "Error"
                req.session.message = validateRes.error.details[0].message;
                res.redirect('/register');
            }
            let user = {
                fullName: req.body.fullName,
                contact: req.body.contact,
                email: req.body.email,
                password: req.body.password
            }
            let userData = await AuthenticateModel.insertUser(user);
            res.redirect('/login');
        } catch (error) {
            console.log("register page error",error)
        }
    }

    async login(req,res){
        let page = {
            title: "login",
            pageName: 'login',
            status: "",
            message: "",
            isUserLoggedIn: false
        }
        if(req.session.isUserLoggedIn){
            page.isUserLoggedIn = true;
        }
        if(req.session.status && req.session.message){
            page.status = req.session.status;
            page.message = req.session.message;
            delete req.session.status,req.session.message;
        }
        res.render("template",page);
    }

    async userLogin(req,res){
        try {
            let Schema = joi.object({
                userName: joi.string().required(),
                password: joi.string().required()
            })
            let validateRes = Schema.validate(req.body);
            if(validateRes && validateRes.error && validateRes.error.details){
                req.session.status = "Error";
                req.session.message = validateRes.error.details[0].message;
                res.redirect("/login");
                return false;
            }
            const userName = req.body.userName;
            const password = req.body.password;
            let userData = await AuthenticateModel.getUserById(userName);
            if(userData){
                let user = userData[0];
                if(user.password == password){
                    req.session.isUserLoggedIn = user.id;
                    res.redirect('/my-blogs');
                } else{
                    req.session.status = "error",
                    req.session.message = "incorrected password"
                    res.redirect('/login')
                }
            } else{
                req.session.status = "error",
                req.session.message = "incorrected email Address"
                res.redirect('/login')
            }
        } catch (error) {
            console.log("login error",error);
        }
    }
}
module.exports = new AuthenticateController();