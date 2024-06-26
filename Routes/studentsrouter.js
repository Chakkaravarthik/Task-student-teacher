import express from 'express'
import { students } from '../localdata/localvariables.js';

//server routes creation
const studentroute = express.Router();

//to get all students
studentroute.get('/', async (req,res)=>{
    res.send({students})
})


// to addd a students
studentroute.post('/', async(req,res)=>{
    const {body}= req;
    const studobj = {
        ...body,currentteacherid:null,previousteacherid:null,id:Date.now().toString()
    }
    if(studobj){
        students.push(studobj)
        res.send({msg:'student added successfully'});
    }else{
        res.send({msg:'incorrect input '})
    }

})
    

export default studentroute;