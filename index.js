require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose")

const {userRouter}  = require("./Routes/user");
const {courseRouter} = require("./Routes/course");
const {adminRouter} = require("./Routes/admin");
const app = express();

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

async function main(){
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(3000);
}

main();