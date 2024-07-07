import mongoose from "mongoose";
import dotenv from 'dotenv';


dotenv.config();

const DBname = process.env.DB_dbname;
const DBcluster = "localhost:27017"
const LocalURI = `mongodb://${DBcluster}/${DBname}`
const dbuser = process.env.DB_user;
const pass = encodeURIComponent(process.env.DB_pass);
const cloudURI = `mongodb+srv://${dbuser}:${pass}@cluster0.b1fwpte.mongodb.net/${DBname}?retryWrites=true&w=majority&appName=Cluster0`




const mongooseconnecttoDB = async ()=>{
    try{
        await mongoose.connect(cloudURI);
        console.log("mongoose connected")
    }catch(e){
        console.log(e);
    }
}

export default mongooseconnecttoDB;