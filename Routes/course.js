const {Router} = require("express");

const courseRouter = Router();


courseRouter.post("/purchases", function(req, res){
    // you would expect the user to pay you money
})

courseRouter.get("/preview", function(req, res){
    res.json({
        message: "See all the courses"
    })
})

module.exports = {
    courseRouter: courseRouter
}