const express = require("express");
const {userRouter}  = require("./Routes/user");
const {courseRouter} = require("./Routes/course")
const jwt = require("jsonwebtoken");
const { courseRouter } = require("./Routes/course");
const app = express();

app.use("/user", userRouter);
app.use("/course", courseRouter);



app.listen(3000);