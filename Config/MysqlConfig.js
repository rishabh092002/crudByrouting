const mysql = require("mysql")

const connection = mysql.createConnection(
    {
        host: "localhost",
        database: "test",
        user: "root",
        password: "admin"
    }
)

connection.connect(function(error){
    if(error){
        console.log("databse connection failed");
    } else{
        console.log("databse connected....");
    }
});

module.exports.connection = connection;