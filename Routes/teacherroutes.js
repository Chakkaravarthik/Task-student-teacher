import express from 'express'
import { teachers } from '../localdata/localvariables.js';

//router creation

const teacherrouter = express.Router();

//To get all teachers data
teacherrouter.get('/', async (req,res)=>{
    
    res.send({teachers});
})

// to a teacher

teacherrouter.post('/', async(req,res)=>{
    const {body}= req;
    const teacherobj = {
        ...body,studentsid:[],id:Date.now().toString()
    }
    if(teacherobj){
        teachers.push(teacherobj)
        res.send({msg:'teacher added successfully'});
    }else{
        res.send({msg:'incorrect input '})
    }

})


// assign student to teacher
teacherrouter.put('/:teachid', async (req, res) => {
    const { teachid } = req.params;
    console.log(teachid);
    const { studentid } = req.body;
    console.log(studentid);

    // Find teacher
    try {
        const teachindex = teachers.findIndex(ele => ele.id == teachid);
        teachers[teachindex].studentsid.push(studentid);
        res.status(200).send({ msg: 'Student assigned successfully' });
        
    }catch (e) {
        console.log(e.message);
        res.status(500).send({ msg: 'Error assigning student' });
    }
});

// students list of a particular teacher
teacherrouter.get('/:teacherid', (req,res)=>{
    const {teacherid} = req.params;
    const teacherindex = teachers.findIndex(ele => ele.id == teacherid);
    const studentsarr = teachers[teacherindex].studentsid
    res.send({studentsarr});
})
    

export default teacherrouter;