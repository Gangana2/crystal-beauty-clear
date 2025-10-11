export function getStudents(req,res){
    res.json({message: 'this is get request from student controller'});
}

export function createStudent(req,res){
    res.json({message: 'this is post request from student controller'});
}  

export function updateStudent(req,res){
    res.json({message: 'this is put request from student controller'});
}

export function deleteStudent(req,res){
    res.json({message: 'this is delete request from student controller'});
}
