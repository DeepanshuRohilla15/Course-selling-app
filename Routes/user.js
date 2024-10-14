const {Router} = require("express");

const userRouter = Router();

userRouter.post("/signup", function(req, res){
    res.json({
        message: "Signup Endpoint"
    })
})

userRouter.post("/signin", function(req, res){

})

userRouter.get("/purchases", function(req, res){

})

module.exports = {
    userRouter: userRouter
}