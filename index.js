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
            res.render("home.ejs", { count: result[0].count });
        }
    });
});

// Show route
app.get("/user", (req, res) => {
    let q = `select * from user`;
  });

app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});

//Edit Route
app.get("/user/:id/edit",(req,res)=>{
    let {id} = req.params;
    let q = `SELECT * FROM user WHERE id='${id}'`;
    try {
        connection.query(q, (err, result) => {
          if (err) throw err;
          let user = result[0];
          res.render("edit.ejs"),{user};
        });
      }
      catch (err) {
        console.log(err);
        res.send("some error in database")
      }
   
});



// function addData() {
//     // Prepare SQL query for inserting a user
//     const query = 'INSERT INTO user (id, username, email, password) VALUES ?';
//     const values = [];

//     // Generate 100 random users
//     for (let i = 0; i < 100; i++) {
//         values.push(getRandomUser());
//     }

//     // Insert the users into the database
//     connection.query(query, [values], (err, results) => {
//         if (err) {
//             console.error('An error occurred:', err);
//         } else {
//             console.log('100 records added successfully!');
//         }

//         // Close the connection after the operation
//         connection.end();
//     });
// }

// // Call the function to add data
// addData();