const Course        =       require('../models').courses;
const express       =       require('express');
const router        =       express.Router();


const getCourses = (req, res) => {
  return Course
  .findAll({
    attributes: ['course_id','course_name','createdAt','updatedAt'],
    order: [['createdAt', 'DESC']]
  }).then((courses) => res.status(200).send(courses))
  .catch((error) => { res.status(400).send(error)})
}

const getCourseById = (req, res) => {
  return Course.findOne(
    {
      attributes: ['course_id','course_name','createdAt','updatedAt'],
      limit : 1,
      where : {
        course_id : req.params.id
      }
    })
    .then((course) => {
    if(!course) {
      return res.status(404).send({message : 'Course Not Found'});
    } 
      return res.status(200).send(course)
  }).catch((error) => res.status(400).send(error))
}


const createCourse = (req, res) => {
  return Course
  .create({
    course_name: req.body.course_name,
  })
  .then((course) => res.status(201)
  .send({"message":`Course created with course_name: ${req.body.course_name}`,"data":course}))
  .catch((error) => res.status(400).send(error));
}


const updateCourse = (req,res) => {
  return Course
  .findOne({
    where : {
      course_id : req.params.id
    }
  })
  .then(course => {
    if (!course) {
      return res.status(404).send({
        message: 'Course Not Found',
      });
    }
    return course
      .update({
        course_name: req.body.course_name,
      })
      .then(() => res.status(200).send({"message":`Course updated with course_id: ${req.params.id}`,"data":course}))
      .catch((error) => res.status(400).send(error));
  })
  .catch((error) => res.status(400).send(error));
}


const deleteCourse = (req,res) => {
  return Course
  .findOne({
    where : {
      course_id :req.params.id
    }
  })
  .then(course => {
    if (!course) {
      return res.status(400).send({
        message: 'Course Not Found',
      });
    }
    return course
    .destroy()
    .then(() => res.status(204).send({"message":`Course deleted with course_id: ${req.params.id}`})
    .catch((error) => res.status(400).send(error)));
  })
  .catch((error) => res.status(400).send(error));
}

router.get('/', (req, res) => {res.send('Hello World!!')})
router.get('/courses', getCourses)
router.get('/courses/:id', getCourseById)
router.post('/courses', createCourse)
router.put('/courses/:id', updateCourse)
router.delete('/courses/:id', deleteCourse)
module.exports = router;