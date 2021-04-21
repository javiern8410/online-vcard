import { Schema, model } from 'mongoose'; 


const employeeShema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    mobile: String,
    telephone: String,
    company: String,
    position: String,
    photo: String
});

employeeShema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Employee = model('Employee', employeeShema);

module.exports = Employee;