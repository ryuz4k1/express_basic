const Course        =       require('../models').Courses;
const express       =       require('express');
const router        =       express.Router();


/** Old
const getCourses = (req, res) => {
  return Course
  .findAll({
    attributes: ['course_id','course_name','createdAt','updatedAt'],
    order: [['createdAt', 'DESC']]
  }).then((courses) => {
    return res.status(200).send(courses)
  })
  .catch((error) => {
    return res.status(400).send(error)
  })
}
**/

//New
async function getCourses (req, res) {
  let course = await Course.findAll({
    attributes: ['course_id','course_name','createdAt','updatedAt'],
    order: [['createdAt', 'DESC']]
  });
  return res.status(200).send(course);
}

/* Old
const getCourseById = (req, res) => {
  return Course
  .findOne(
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
  }).catch((error) => {
    return res.status(400).send(error)
  })
}
*/

//New
async function getCourseById  (req, res) {
  let course = await Course.findOne(
    {
      attributes: ['course_id','course_name','createdAt','updatedAt'],
      limit : 1,
      where : {
        course_id : req.params.id
      }
    });
    if (!course) {
      return res.status(400).send('There is not such a course!');
    }
    return res.status(200).send(course);
}


/* Old
const createCourse = (req, res) => {
  return Course
  .create({
    course_name: req.body.course_name,
  })
  .then((course) => res.status(201)
  .send({"message":`Course created with course_name: ${req.body.course_name}`,"data":course}))
  .catch((error) => res.status(400).send(error));
}
*/

// New Create
async function createCourse (req, res) {
  let course = await Course.create({
    course_name: req.body.course_name
  })
  return res.status(200).send({"message":`Course created with course_name: ${req.body.course_name}`,"data":course});
}

/* Old
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
      .then(() => {
        return res.status(200).send({"message":`Course updated with course_id: ${req.params.id}`,"data":course})
      })
      .catch((error) => {
        return res.status(400).send(error)
      });
  })
  .catch((error) => {
    return res.status(400).send(error)
  });
}
*/

//New Update
async function updateCourse (req,res) {
  let course = await Course.findOne(
    {
      where : {
        course_id : req.params.id
      }
    }
  )
  if (!course) {
    return res.status(404).send({
      message: 'Course Not Found',
    });
  }
  course.update({
    course_name : req.body.course_name
  })
  return res.status(200).send({"message":`Course updated with course_id: ${req.params.id}`,"data":course})
}


/*
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
    .then(() => {
      return res.status(204).send({"message":`Course deleted with course_id: ${req.params.id}`})
    .catch((error) => {
      return res.status(400).send(error)
    })
  })
})
.catch((error) => {
  return res.status(400).send(error)
});
}
*/

//New Delete
async function deleteCourse (req,res) {
  let course = await Course.findOne({
    where : {
      course_id : req.params.id
    }
  })

  if (!course) {
    return res.status(400).send({
      message: 'Course Not Found'
    });
  }
  return res.status(200).send({"message":`Course deleted with course_id: ${req.params.id}`})
}

router.get('/', (req, res) => {res.send('Hello World!!')})
router.get('/courses', getCourses)
router.get('/courses/:id', getCourseById)
router.post('/courses', createCourse)
router.put('/courses/:id', updateCourse)
router.delete('/courses/:id', deleteCourse)
module.exports = router;