const {Router} = require("express");
const adminRouter = Router();
const {adminModel, courseModel} = require("../db");
const jwt = require("jsonwebtoken"); 
const {JWT_ADMIN_PASSWORD} = require("../config");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const {adminMiddleware} = require("../middleware/admin")


adminRouter.post("/signup",async function(req, res){
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
    await adminModel.create({
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

adminRouter.post("/signin",async function(req, res){
    const {email, password} = req.body;

    const admin = await adminModel.findOne({ // either the user or undefined
        email
    });

    const passwordMatch = await bcrypt.compare(password, admin.password);
    if(admin && passwordMatch){
        const token = jwt.sign({
            id: admin._id
        }, JWT_ADMIN_PASSWORD);

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

// admin create a course
adminRouter.post("/", adminMiddleware ,async function(req, res){
    const adminId = req.userId;

    const { title, description, imageUrl, price } = req.body;

    const course =  await courseModel.create({
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
        creatorId: adminId
    })

    res.json({
        message: "Course created",
        courseId: course._id
    })
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