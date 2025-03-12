const mongoose = require("mongoose");
const user = require("../Routes/user");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;
const connectDB = async () => {
    try { 
        await mongoose.connect("mongodb+srv://ashwanisingh:elVZUtternK9kiNa@cluster0.vk9uv.mongodb.net/app100xdevs");
        console.log("Connected to MongoDB");
    } catch (err) {                                 
        console.log(err);
    }
};
connectDB();                            
const userSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstname: String,
    lastname: String,
});

const adminSchema = new Schema({ 
    email: {type: String, unique: true},
    password: String,
    firstname: String,
    lastname: String,
})

  const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    image: String,
    creatorID: ObjectId,
    creator: String,
  });

  purchaseSchema = new Schema({
    userID: ObjectId,
    courseID: ObjectId
  });
  
  const userModel = mongoose.model("user", userSchema);
  const adminModel = mongoose.model("admin", adminSchema);
  const courseModel = mongoose.model("course", courseSchema);
  const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports = {
    userModel: userModel,
    adminModel: adminModel, 
    courseModel: courseModel,
    purchaseModel: purchaseModel,
};