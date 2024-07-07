import express from 'express'
import { studentModel } from '../DB_utils/model.js';

//server routes creation
const studentroute = express.Router();

//to get all students
studentroute.get('/', async (req,res)=>{
    const students = await studentModel.find({});
    res.send(students);
})


// to addd a students
studentroute.post('/', async(req,res)=>{
    const {body}= req;
    
    if(body){
        const newstudobj = await new studentModel({
            ...body,currentteacherid:null,previousteacherid:null,id:Date.now().toString()
        })

        await newstudobj.save();
        res.send({msg:'student added successfully'});
    }else{
        res.send({msg:'incorrect input '})
    }

})
    

export default studentroute;