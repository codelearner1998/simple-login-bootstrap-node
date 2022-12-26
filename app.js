const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

mongoose.set("strictQuery", true);
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/onlyLoginpageDB");

const itemSchema = mongoose.Schema({
  email: String,
  mobile: Number,
  password: String,
});

const Item = mongoose.model("Item", itemSchema);

const newItem = new Item({
  email: "khanmahmed@gmail.com",
  mobile: 565654545,
  password: "abcbac",
});

const newItem2 = new Item({
  email: "sultan@yahoo.com",
  mobile: 8989820,
  password: "1234",
});

// newItem2.save()

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/terms", (req, res) => {
  res.render("terms");
});

app.post("/", (req, res) => {
  let myEmail = req.body.email;
  let pass = req.body.password;

  Item.find({}, function (err, doc) {
    if (err) {
      console.log(err);
    } else {
      doc.forEach((every) => {
        let storeEmail = every.email;
        let storePass = every.password;

        if (myEmail === storeEmail && pass === storePass) {
          res.redirect("/login")
        } else {
          console.log("Please enter correct mail id or password ");
          
        }
      });
    }
  });
});

app.post("/register", (req, res) => {
  let Nemail = req.body.email;
  let mobile = req.body.mobile;
  let pass = req.body.psw;

  Item.findOne({email : Nemail }, (err, found) => {
  
    if (err) {
        console.log(err);
        
    } else {
      if (found) {
        if (Nemail === found.email) {

            res.redirect("/")

            console.log("User is already register with mail id ");
            
        }
        
      } 
        
    }


    // const registerUser = new Item({
    //     email: Nemail,
    //     mobile: mobile,
    //     password: pass,
    //   });

    //   registerUser.save(function (err) {
    //     if (err) {

    //         console.log(err);

           
          
    //     } else {

            
          
    //       console.log("Succesfully saved new register user in DB ");
    //       res.redirect("/login")
          
    //     }
    //   });
  });
});

app.listen("3000", (req, res) => {
  console.log("Server started on port 3000");
});
