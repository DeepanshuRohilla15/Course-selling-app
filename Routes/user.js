const {Router} = require("express");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const {userModel} = require("../db");
const  jwt = require("jsonwebtoken");
const JWT_USER_PASSWORD = "aldadscn23";

const userRouter = Router();

userRouter.post("/signup",async function(req, res){
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

    const { email, password, firstName, lastName } = req.body;

    //hash the password
    const hashPassword = await bcrypt.hash(password, 5);

    //put inside try catch block

    try{
        await userModel.create({
            email: email,
            password: hashPassword,
            firstName: firstName,
            lastName: lastName
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

userRouter.post("/signin",async function(req, res){
    const {email, password} = req.body;

    const user = await userModel.findOne({ // either the user or undefined
        email
    });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if(user && passwordMatch){
        const token = jwt.sign({
            id: user._id
        }, JWT_USER_PASSWORD);

        res.json({
            token: token
        })
    }
    else{
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
})

userRouter.get("/purchases", function(req, res){

})

module.exports = {
    userRouter: userRouter
}