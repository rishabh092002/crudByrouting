const BlogModel = require("../Model/blogModel");
const commonService = require("../services/CommonServices");
const joi = require("joi");

class BlogController {
    constructor() { }

    async myBlogs(req, res) {
        let page = {
            title: "my blogs page",
            pageName: "my-blogs",
            user: "",
            isUserLoggedIn: ""
        }
        if (req.session.isUserLoggedIn) {
            page.isUserLoggedIn = true;
        }
        let blog = req.session.isUserLoggedIn;
        console.log("blog", blog)
        let blogs = await BlogModel.getBlogById(blog)
        page.user = blogs;
        res.render("template", page);
    }

    async getBLog(req, res) {
        let page = {
            title: "create blog",
            pageName: "blog",
            status: "",
            message: "",
            isUserLoggedIn: false
        }
        if (req.session.isUserLoggedIn) {
            page.isUserLoggedIn = true;
        }
        if (req.session.status && req.session.message) {
            page.status = req.session.status;
            page.message = req.session.message;
            delete req.session.status, req.session.message;
        }
        res.render("template", page);
    }

    async createBlog(req, res) {
        try {
            const schema = joi.object({
                title: joi.string().required(),
                description: joi.string().required()
            });
            let Id = req.session.isUserLoggedIn;
            const validateRes = schema.validate(req.body);
            if (validateRes && validateRes.error && validateRes.error.details) {
                req.session.status = "Error"
                req.session.message = validateRes.error.details[0].message
                res.redirect('/blog');
                return false;
            }

            let blogData = {
                title: req.body.title,
                description: req.body.description,
                image: "",
                userId: ""
            }
            blogData.userId = Id
            const allImage = req.files.blogimage;
            let allImgName = [];
            if (allImage && allImage.length > 1) {
                for (const singleImg of allImage) {
                    let imgnewName = await commonService.generateImgName(singleImg.name)
                    singleImg.name = imgnewName
                    await commonService.uploadPath(singleImg);
                    allImgName.push(imgnewName);
                }
            } else {
                let imgnewName = await commonService.generateImgName(allImage.name)
                allImage.name = imgnewName
                await commonService.uploadPath(allImage);
                allImgName.push(imgnewName);
            }
            let imgData = allImgName.toString(",");
            blogData.image = imgData;
             await BlogModel.insertBlog(blogData);
            res.redirect('/all-blogs');
        } catch (error) {
            console.log("create blog error", error);
        }
    }
    async allBlogs(req, res) {
        try {
            let page = {
                title: "all blogs",
                pageName: "all-blogs",
                user: [],
                isUserLoggedIn: false
            }
            if (req.session.isUserLoggedIn) {
                page.isUserLoggedIn = true
            }
            // let id = req.session.isUserLoggedIn;
            // console.log("id",id)
            let getBlog = await BlogModel.getAllBlog();
            page.user = getBlog;
            res.render("template", page);
        } catch (error) {
            console.log("all blog error", error);
        }
    }

    async editBlog(req, res) {
        try {
            let page = {
                title: "edit blog",
                pageName: "edit-blog",
                user: "",
                status: "",
                message: "",
                isUserLoggedIn: false
            }
            if (req.session.isUserLoggedIn) {
                page.isUserLoggedIn = true
            }
            if (req.session.status && req.session.message) {
                page.status = req.session.status;
                page.message = req.session.message;
                delete req.session.status, req.session.message;
            }
            const userId = req.query.userId;
            let editblog = await BlogModel.editBlogById(userId);
            page.user = editblog;
            res.render("template", page);
        } catch (error) {
            console.log("edit blog error", error);
        }
    }

    async update(req, res) {
        try {
            const schema = joi.object({
                title: joi.string().required(),
                description: joi.string().required()
            });
            let Id = req.session.isUserLoggedIn;
            const validateRes = schema.validate(req.body);
            if (validateRes && validateRes.error && validateRes.error.details) {
                req.session.status = "Error"
                req.session.message = validateRes.error.details[0].message
                res.redirect('/blog');
                return false;
            }
            const userId = req.query.userId;
            let blogData = {
                title: req.body.title,
                description: req.body.description,
                image: ""
            }
            if (req.files && req.files.blogimage) {
                let allImage = req.files.blogimage;
                let allImgName = [];
                if (allImage && allImage.length > 1) {
                    for (const singleImg of allImage) {
                        let imgnewName = await commonService.generateImgName(singleImg.name);
                        singleImg.name = imgnewName
                        await commonService.uploadPath(singleImg);
                        allImgName.push(imgnewName);
                    }
                } else {
                    let imgnewName = await commonService.generateImgName(allImage.name)
                    allImage.name = imgnewName
                    await commonService.uploadPath(allImage);
                    allImgName.push(imgnewName);
                    let imgData = allImgName.toString(",");
                    blogData.image = imgData;
                }
            }
            await BlogModel.updateBlogById(userId, blogData)
            res.redirect("/all-blogs");
        } catch (error) {
            console.log("update error", error)
        }
    }

    async deleteBlog(req, res) {
        try {
            const Blogid = req.query.userId;
            await BlogModel.deleteBlogById(Blogid);
            res.redirect('/all-blogs')
        } catch (error) {
            console.log("delete error", error)
        }
    }
}
module.exports = new BlogController();