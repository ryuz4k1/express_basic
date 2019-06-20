
/**
 * USAGE 
 * 
 * curl -X GET http://localhost:3000/api/courses --> Tüm derslerin verilerini döndürür.
 * curl -X GET http://localhost:3000/api/courses/1 --> Sadece 1 numaralı id sahip dersin verilerini döndürür.
 * curl -H "Content-Type: application/json" -X POST -d '{"name":"newCourse"}'  http://localhost:3000/api/courses --> Yeni bir ders ekler.
 * curl -H "Content-Type: application/json" -X PUT -d '{"name":"updatedName"}'  http://localhost:3000/api/courses/1 -->1 Numaralı id deki dersin adını günceller.
 * curl -H "Content-Type: application/json" -X DELETE  http://localhost:3000/api/courses/1 --> 1 numaralı id deki dersi siler.
 * 
 * 
 */

const express		= 	require('express');
const app			= 	express();
const db			= 	require('./database.js');


app.use(express.json())

app.get('/', (req, res) => {res.send('Hello World!!')})
app.get('/courses', db.getCourses)
app.get('/courses/:id', db.getCourseById)
app.post('/courses', db.createCourse)
app.put('/courses/:id', db.updateCourse)
app.delete('/courses/:id', db.deleteCourse)


/**
const courses = [
	{
		id: 1,
		name: 'course1'
	},
	{
		id: 2,
		name: 'course2'
	},
	{
		id: 3,
		name: 'course3'
	}
];


app.get('/api/courses',(req, res) => {
	res.send(courses);
});


app.get('/api/courses/:id',(req, res) =>{
	let course = courses.find(c => c.id == req.params.id);
	if (!course) {return res.status(404).send('The course with the given ID was not found')}
	res.send(course)
});


app.post('/api/courses' , (req, res) => {
	const { error } = validateCourse(req.body);
	if (error) {return res.status(400).send(error.details[0].message)}

	courses.push({id : courses.length + 1,name : req.body.name});
	res.send(courses);
});


app.put('/api/courses/:id',(req, res) => {
	let course = courses.find(c => c.id == req.params.id);
	if (!course) {return res.status(404).send('The course with the given ID was not found')}

	const { error } = validateCourse(req.body);

	if (error) {return res.status(400).send(error.details[0].message)}

	course.name = req.body.name;
	res.send(course);
});


app.delete('/api/courses/:id',(req, res) => {
	let course = courses.find(c => c.id == req.params.id);

	if (!course) {return res.status(404).send('The course with the given ID was not found')}

	const index = courses.indexOf(course);

	courses.splice(index,1);
	res.send(course);
});


function validateCourse(course){
	const schema = {name : Joi.string().min(3).required()}

	return Joi.validate(course,schema);
};
*/

const port = process.env.PORT || 3000;
app.listen(port,() => console.log(`Listening on port ${port}...`));