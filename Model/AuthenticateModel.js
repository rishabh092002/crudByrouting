const {connection} = require("../Config/MysqlConfig");

class AuthenticateModel {
    constructor(){}

    async insertUser(user){
        return new Promise(function(resolve,reject){
            let query = `INSERT INTO user(full_name, contact, email, password) VALUES ('${user.fullName}','${user.contact}','${user.email}','${user.password}')`;
            connection.query(query,function(error,result){
                if(error){
                    reject(error);
                }else{
                    resolve(result);
                }
            });
        });
    }

    async getUserById(email){
        return new Promise(function(resolve,reject){
            let query = `SELECT * FROM user WHERE email ='${email}'`;
            connection.query(query,function(error,result){
                if(error){
                    reject(error);
                } else{
                    let user = null;
                    if(result && result.length){
                        user = result
                    }
                    resolve(user);
                }
            });
        });
    }
}
module.exports = new AuthenticateModel();