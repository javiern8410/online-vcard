import { Schema, model } from 'mongoose'; 

const employeeSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    mobile: String,
    telephone: String,
    company: String,
    position: String,
    photo: String
});

employeeSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Employee = model('Employee', employeeSchema);

module.exports = Employee;