const mongoose = require("mongoose");
const { Schema } = mongoose;
const db = async () => {
    await mongoose.connect(process.env.MongoDBURI);
    console.log(process.env.MongoDBURI);
    console.log("Connected to MongoDB");
};
db();
const { ObjectId } = mongoose.Schema.Types;
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