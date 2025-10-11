import studentModel from '../model/student.js';


export function getStudents(req, res) {
    studentModel.find().then(
        (students) => {
            res.json(students);
        }
    ).catch(
        () => {
            res.json({ message: 'error while fetching students data' });
        }
    )
}

export function createStudent(req, res) {
    const student = new studentModel(req.body);
    student.save().then(
        () => {
            res.json({ message: 'student data inserted successfully' });
        }
    ).catch(
        () => {
            res.json({ message: 'error while inserting student data' });
        }
    )
}

export function updateStudent(req, res) {
    res.json({ message: 'this is put request from student controller' });
}

export function deleteStudent(req, res) {
    res.json({ message: 'this is delete request from student controller' });
}
