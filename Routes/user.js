const {Router} = require("express");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const {userModel} = require("../db");

const userRouter = Router();

userRouter.post("/signup",async function(req, res){
    const { email, password, firstName, lastName } = req.body;
    // adding zod for input validation
    const requiredBody = z.object({
        email: z.string().min(3).max(100).email(),
        password: z.string().min(3).max(100),
        firstName: z.string().min(3).max(100),
        lastName: z.string().min(3).max(100)
    })

    const parsedDataWithSuccess = requiredBody.safeParse(req.body);

    if(!parsedDataWithSuccess.success){
        res.json({
            message: "Incorrect format",
            error: parsedDataWithSuccess.error
        })
        return
    }

    //hash the password
    const hashPassword = await bcrypt.hash(password, 5);

    //put inside try catch block

    try{
        await userModel.create({
            email: email,
            password: hashPassword,
            firstName: firstName,
            lastname: lastName
        })
    } catch(e){
        res.json({
            message: "Your signup is failed"
        })
    }

    res.json({
        message: "Signup succeeded"
    })

})

userRouter.post("/signin", function(req, res){

})

userRouter.get("/purchases", function(req, res){

})

module.exports = {
    userRouter: userRouter
}