const {Router} = require("express");
const adminRouter = Router();


adminRouter.post("/signup", function(req, res){
    
})

adminRouter.post("/signin", function(req, res){

})

// admin create a course
adminRouter.post("/course", function(req, res){

})

//change the course, price
adminRouter.put("/course", function(req, res){

})

// see all the courses created by admin
adminRouter.get("/course/bulk", function(req, res){

})

module.exports = {
    adminRouter: adminRouter
}