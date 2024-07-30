// const { faker } = require('@faker-js/faker');
// const mysql = require('mysql2');
// const express = require("express");
// const app = express();
// const path = require("path");

// app.set("view engine","ejs");
// app.set("views", path.join(__dirname, "/views"))

// const connection =  mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'delta_app',
//     password: 'MySQL@2024'
//   }); 
  

//   let getRandomUser = () => {
//     return [
//       faker.string.uuid(),
//       faker.internet.userName(),
//       faker.internet.email(),
//       faker.internet.password(),
//     ];
//   };

// //home route
// app.get("/",(req,res) =>{
//   let q = `SELECT count(*)FROM user`;
// });

// //Show Route

// app.get("/user",(req,res) =>{
//   let q = `SELECT * FROM user`;
//   try{
//     connection.query(q,(err,result) =>{
//       if(err) throw err;

//       console.log(result)
//       res.render(result);
//     });
//   } catch(err){
//     console.log(err);
//     res.send("some error in DB");
//   }
// });

// app.listen("8080",() =>{
//   console.log("server is listening to port 8080");
// });


const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"))

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password: 'MySQL@2024'
});

let getRandomUser = () => {
    return [
        faker.string.uuid(),
        faker.internet.userName(),
        faker.internet.email(),
        faker.internet.password(),
    ];
};

// Home route
app.get("/", (req, res) => {
    let q = 'SELECT count(*) as count FROM user';
    connection.query(q, (err, result) => {
        if (err) {
            console.log(err);
            res.send("Error in DB");
        } else {
            res.render("index", { count: result[0].count });
        }
    });
});

// Show route
app.get("/user", (req, res) => {
    let q = 'SELECT * FROM user';
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.render("users", { users: result });
        });
    } catch (err) {
        console.log(err);
        res.send("Some error in DB");
    }
});

app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});

  