const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const userSchema = new Schema({
    email: {type: String , unique: true},
    password: String,
    firstName: String,
    lastname: String
})

const adminSchema = new Schema({
    email: {type: String , unique: true},
    password: String,
    firstName: String,
    lastname: String
})

const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: ObjectId
})

const purchaseSchema = new Schema({
    courseId: ObjectId,
    userId: ObjectId
})


const userModel = mongoose.Model("user", userSchema);
const adminModel = mongoose.Model("admin", adminSchema);
const courseModel = mongoose.Model("course", courseSchema);
const purchaseModel = mongoose.Model("purchase", purchaseSchema);


module.exports = {
    userModel,
    adminModel, 
    courseModel,
    purchaseModel
}
