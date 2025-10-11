import express from 'express';
import { getStudents, createStudent, updateStudent, deleteStudent } from '../controller/studentController.js';

const studentRouter = express.Router(); // empty router

studentRouter.get('/', getStudents);

studentRouter.post('/', createStudent);

studentRouter.put('/', updateStudent);

studentRouter.delete('/', deleteStudent);

export default studentRouter;