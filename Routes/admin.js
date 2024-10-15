const {Router} = require("express");
const adminRouter = Router();
const {adminModel} = require("../db");


adminRouter.post("/signup", function(req, res){
    
})

adminRouter.post("/signin", function(req, res){

})

// admin create a course
adminRouter.post("/", function(req, res){

})

//change the course, price
adminRouter.put("/", function(req, res){

})

// see all the courses created by admin
adminRouter.get("/bulk", function(req, res){

})

module.exports = {
    adminRouter: adminRouter
}