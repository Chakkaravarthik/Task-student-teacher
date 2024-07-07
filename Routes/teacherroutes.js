import express from 'express'
import { studentModel, teacherModel } from '../DB_utils/model.js';

//router creation

const teacherrouter = express.Router();

//To get all teachers data
teacherrouter.get('/', async (req,res)=>{
    const teachers = await teacherModel.find({})
    res.send(teachers);
})

// to a create teacher

teacherrouter.post('/', async(req,res)=>{
    const {body}= req;
    const teacherobj = await new teacherModel({
        ...body,studentsid:[],id:Date.now().toString()
    })
    if(teacherobj){
        await teacherobj.save();
        res.send({msg:'teacher added successfully'});
    }else{
        res.send({msg:'incorrect input '})
    }

})
 // here both student and teacher are assigned to one of them

teacherrouter.put('/:teachid', async (req, res) => {
    const { teachid } = req.params;
    const { studentid } = req.body;

    // Log the received IDs
    console.log(`Teacher ID: ${teachid}`);
    console.log(`Student ID: ${studentid}`);

    // Basic validation
    if (!teachid || !studentid) {
        return res.status(400).send({ msg: 'Teacher ID and Student ID are required' });
    }

    try {
        // Find teacher
        const teacher = await teacherModel.findOne({ id: teachid });

        if (!teacher) {
            return res.status(404).send({ msg: 'Teacher not found' });
        }

        // Update the teacher's student list
        await teacherModel.updateOne({ id: teachid }, { $addToSet: { studentsId: studentid } }); // $addToSet to avoid duplicates

        const student = await studentModel.findOne({id:studentid});

        if(!student){
            return res.status(404).send({ msg: 'Student not found' });
        }

        await studentModel.updateOne(
            {id:studentid},
            {$set:{currentteacherid: teachid}}
        )

        res.status(200).send({ msg: 'Student assigned successfully' });
    } catch (error) {
        console.error(error.message);
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