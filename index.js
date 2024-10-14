const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();


app.use(express.json());

app.post("/user/signup", function(req, res){
    res.json({
        message: "Signup Endpoint"
    })
})

app.post("/user/signin", function(req, res){

})

app.get("/user/purchases", function(req, res){

})

app.post("/course/purchases", function(req, res){
    // you would expect the user to pay you money
})

app.get("/courses", function(req, res){

})

app.listen(3000);