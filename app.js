const Joi = require('joi'); //Bir model yapısında olması gereken şeyleri kontrol eden kütüphane.
const express = require('express');
const app = express();


app.use(express.json());


//Static bir databases , id ve name field
const courses = [
	{
		id:1,name:'course1'
	},
	{
		id:2,name:'course2'
	},
	{
		id:3,name:'course3'
	}
]


//Temel route
app.get('/', (req,res) => {
	res.send('Hello World!!');
});


//Static databasedeki verileri döndürür.
app.get('/api/courses',(req,res) => {
	res.send(courses);
});

//İstenilen id deki dersin verilerini döndürür.
app.get('/api/courses/:id',(req,res) =>{
	let course = courses.find(c => c.id == req.params.id); //Eğer istek gelinen urldeki course id , bizim arrayde var mı buluyor
	if (!course) {  //404 Yoksa
		res.status(404).send('The course with the given ID was not found')
	}
	res.send(course) // Eğer varsa dönsün

});

//Yeni bir ders ekler,body de ders adı yollanmalıdır.Geri dönüş olarak eklenmiş veri dahil tüm verileri döndürür.
app.post('/api/courses' , (req,res) => {
	const { error } = validateCourse(req.body); //Yukarıdaki method un başka bir gösterimi daha kullanışlı

	if (error) {
		//400 Bad Request
		res.status(400).send(error.details[0].message)
		return;
	}

	const course = {
		id : courses.length + 1,
		name : req.body.name
	};

	courses.push(course);
	res.send(courses);
});



//İstenilen id deki veriyi günceller, bodyde name yollanmalıdır.Geri dönüş olarak güncellenmiş veri dahil tüm dersleri döndürür.
app.put('/api/courses/:id',(req,res) => {
	//Look up the course
	//Eğer yoksa course , return 404
	let course = courses.find(c => c.id == req.params.id); //Eğer istek gelinen urldeki course id , bizim arrayde var mı buluyor
	if (!course) {  //404 Yoksa
		res.status(404).send('The course with the given ID was not found')
	}
	//Validate yapıyoruz kontrol,bunun için validate fonksiyonuna yolladık
	//const result = validateCourse(req.body); Bunu kullanmak istersek , if(result.error)
	const { error } = validateCourse(req.body); //Yukarıdaki method un başka bir gösterimi daha kullanışlı

	if (error) {
		//400 Bad Request
		res.status(400).send(error.details[0].message)
		return;
	}


	//Herşey okayse Update course
	//Return the updated course

	course.name = req.body.name;
	res.send(course);




});


//İstenilen id deki dersi siler , geri dönüş olarak silinmiş veri dahil tüm verileri döndürür.
app.delete('/api/courses/:id',(req,res) => {
	//Look up the course
	//Not existing,return 404
	let course = courses.find(c => c.id == req.params.id); //Eğer istek gelinen urldeki course id , bizim arrayde var mı buluyor

	if (!course) {  //404 Yoksa
		res.status(404).send('The course with the given ID was not found')
	}


	//Delete
	const index = courses.indexOf(course);
	courses.splice(index,1);

	res.send(course);


	//Return the same course
})



//Bu fonksiyon gönderilen verinin standart bir kalıpta olmasını kontrol eder.
function validateCourse(course){
	//Validate yapıyoruz kontrol
	//If invalid , return 400 - Bad request
	const schema = {
		name : Joi.string().min(3).required() //Gelicek olan course un ismi bu formatta olmalı.En az 3 karaktere sahip olmalı.
	}

	return Joi.validate(course,schema);
}





//Belirlenmiş bir enviroment port varsa oradan çalış yoksa 3000 portundan.
const port = process.env.PORT || 3000;
app.listen(port,() => console.log(`Listening on port ${port}...`));










