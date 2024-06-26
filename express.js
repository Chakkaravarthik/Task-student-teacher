import express from 'express'
import teacherrouter from './Routes/teacherroutes.js';
import studentroute from './Routes/studentsrouter.js';


// creating server
const server = express();

//middleware
server.use(express.json());


// routes for the project

server.use('/teacher', teacherrouter);
server.use('/student', studentroute);

//port creation 
const port = 7000;


//serevr listening
server.listen(port,()=>{
    console.log(`server connected in port no :${port}`);
})