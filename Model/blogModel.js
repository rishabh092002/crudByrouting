const {connection} = require ("../Config/MysqlConfig")

class blogModel {
    constructor(){}

    async insertBlog(data){
        return new Promise(function(resolve,reject){
            let query = `INSERT INTO blog(title, description, image,user_id) VALUES ('${data.title}','${data.description}','${data.image}','${data.userId}')`;
            connection.query(query,function(error,result){
                if(error){
                    reject(error);
                } else{
                    resolve(result);
                }
            });
        });
    }

    async getAllBlog(){
        return new Promise(function(resolve,reject){
            let query = `SELECT * FROM blog`;
            connection.query(query,function(error,result){
                if(error){
                    reject(error);
                } else{
                    resolve(result);
                }
            });
        });
    }

    async getBlogById(id){
        return new Promise(function(resolve,reject){
            let blogQuery = `SELECT * FROM blog WHERE user_id = '${id}'`;
            console.log("blogquery",blogQuery);
            connection.query(blogQuery,function(error,result){
                if(error){
                    reject(error);
                } else{
                    resolve(result);
                }
            });
        });
    }

    async editBlogById(id){
        return new Promise(function(resolve,reject){
            let query = `SELECT * FROM blog WHERE id = '${id}'`
            connection.query(query,function(error,result){
                if(error){
                    reject(error);
                } else{
                    resolve(result[0]);
                }
            });
        });
    }

    async updateBlogById(id,blogData){
        return new Promise(function(resolve,reject){
            let query = `UPDATE blog SET title='${blogData.title}',description='${blogData.description}'`;
            if(blogData.image){
                query+= `,image='${blogData.image}' WHERE id = '${id}'`;
            } else{
                query+= `WHERE id = '${id}'`;
            }
            connection.query(query,function(error,result){
                if(error){
                    reject(error);
                } else{
                    resolve(result);
                }
            });
        });
    }

    async deleteBlogById(id){
        return new Promise(function(resolve,reject){
            let query = `DELETE FROM blog WHERE id = '${id}'`;
            connection.query(query,function(error,result){
                if(error){
                    reject(error)
                } else{
                    resolve(true);
                }
            });
        });
    }
}
module.exports = new blogModel();