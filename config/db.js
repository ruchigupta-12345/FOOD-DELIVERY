import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://ruchigupta9414:cMiuxV14LwzzwJoU@cluster0.uijak.mongodb.net/food_delivery').then(()=> console.log("db connected"))
}