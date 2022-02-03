const express = require('express');
const router = express.Router();
import path from 'path';

const STATIC_CONTEXT = "../../../public/static/images/employees";
const multer  = require('multer')
const storage = multer.diskStorage({
	destination: path.join(__dirname, STATIC_CONTEXT),
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});

// const upload = multer({ dest: path.join(__dirname, STATIC_CONTEXT) });
const upload = multer({
	storage: storage,
	limits: {fileSize: 1000000},
	fileFilter: function(req, file, cb){
		checkFileType(file, cb);
	}
});

// Check File Type
function checkFileType(file, cb){
	// Allowed ext
	const filetypes = /jpeg|jpg|png|gif/;
	// Check ext
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	// Check mime
	const mimetype = filetypes.test(file.mimetype);
  
	if(mimetype && extname){
	  return cb(null,true);
	} else {
	  cb('Error: Images Only!');
	}
}
 
const Employee = require('../../models/Employee');
module.exports = router;

router.get('/employees', async (req, res) => {
	try {
        const employees = await Employee.find({});
		res.send(employees)
	} catch (err) {
		console.log(err);
		res.status(500).send({error: err.message});
	}
});

router.get('/employees/:id', async (req, res) => {
    const { id } = req.params;

	try {
		const response = await Employee.findById(id);
		if(response) {
			res.json(response);
		} else {
			res.status(404).send({error: "Not found"});
		}
	} catch (err) {
		console.log(err.name);
		console.log(err.message);

		if(err.name === 'CastError') {
			res.status(400).send({ error: 'Bad request, id used is malformed!' });
		} else {
			res.status(500).end();
		}
	}
});

router.post('/employees', upload.single('picture'), async (req, res) => {
	const employee = req.body;
	const photo = req.file.filename;

	const newEmployee = new Employee({
		firstName: employee.firstName,
		lastName: employee.lastName,
		email: employee.email,
		mobile: employee.mobile,
		telephone: employee.telephone,
		company: employee.company,
		position: employee.position,
		photo: photo
	});
	
	try {
		const savedEmployee = await newEmployee.save();
		console.log(employee);
		res.status(201).send(savedEmployee)
	} catch (err) {
		console.log(err);
		res.status(500).send({error: err.message});
	}
});

router.put('/employees/:id', upload.single('picture'), (req, res) => {
	const { id } = req.params;
	const employee = req.body;
	const photo = req?.file?.filename || null;

	const newEmployeeInfo = {
		firstName: employee.firstName,
		lastName: employee.lastName,
		email: employee.email,
		mobile: employee.mobile,
		telephone: employee.telephone,
		company: employee.company,
		photo: photo,
		position: employee.position
	};
	
	Employee.findByIdAndUpdate(id, newEmployeeInfo, { new : true })
		.then(response => res.status(200).send(response))
		.catch(err => {
			if(err.name === 'CastError') {
				res.status(400).send({ error: 'Bad request or id used is malformed!' });
			} else {
				res.status(500).end();
			}
		});
});

router.delete('/employees/:id', (req, res) => {
	const { id } = req.params;

	Employee.findByIdAndDelete(id)
		.then(response => {
			console.log(response);
			res.status(204).send(response);
		})
		.catch(err => {
			if(err.name === 'CastError') {
				res.status(400).send({ error: 'Bad request, id used is malformed!' });
			} else {
				res.status(500).end();
			}
		});
});