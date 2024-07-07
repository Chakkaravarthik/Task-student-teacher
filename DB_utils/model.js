import mongoose from "mongoose"



const teacherSchema = new mongoose.Schema({
    id:{
        type:"String",
        required:true,
    },
    name:{
        type:"String",
        required:true,
    },
    batch:{
        type:"String",
        required:true,
    },
    studentsId:{
        type:"Array",
        required:true,
     
    }
})

// students model creation
const teacherModel = new mongoose.model("teacher", teacherSchema,"teachers");


const studentSchema = new mongoose.Schema({
    id:{
        type:"String",
        required:true,
    },
    name:{
        type:"String",
        required:true,
    },
    batch:{
        type:"String",
        required:true,
    },
    currentteacherid:{
        type:"string",
        required:true,
     
    },
    previousteacherid:{
        type:"Array",
        required:true,
     
    }
})

// teaccher model creation
const studentModel = new mongoose.model("student", studentSchema,"students");

export { teacherModel, studentModel} ;