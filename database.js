const Pool      =   require('pg').Pool
const Joi 		=   require('joi')


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'express_basic',
    password: 'roller17',
    port: 5432,
})


const getCourses = (req, res) => {
    pool.query('SELECT * FROM courses ORDER BY course_id ASC', (error, results) => {
        if (error) {throw error}
        return res.status(200).json(results.rows)
    })
}


const getCourseById = (req, res) => {
    const course_id = parseInt(req.params.id)

    pool.query('SELECT * FROM courses WHERE course_id = ($1)', [course_id], (error, results) => {
        if (error) {throw error}
        return res.status(200).json(results.rows)
    })
}


const createCourse = (req, res) => {
    const { course_name } = req.body

    const { error } = validateCourse(req.body);
    if (error) {return res.status(400).send(error.details[0].message)}

    pool.query('INSERT INTO courses (course_name) VALUES ($1)', [course_name], (error, results) => {
        if (error) {throw error}
        return res.status(201).send(`Course added with course_name: ${course_name}`)
    })
}


const updateCourse = (req, res) => {
    const course_id = parseInt(req.params.id)
    const { course_name } = req.body

    const { error } = validateCourse(req.body);
    if (error) {return res.status(400).send(error.details[0].message)}

    pool.query(
        'UPDATE courses SET course_name = $1 WHERE course_id = $2',
        [course_name, course_id],
        (error, results) => {
            if (error) {throw error}
            return res.status(200).send(`Course modified with course_id: ${course_id}`)
        }
    )
}


const deleteCourse = (req, res) => {
    const courses = []
    const course_id = parseInt(req.params.id)

    pool.query('SELECT * FROM courses ORDER BY course_id ASC', (error, results) => {
        if (error) {throw error}

        for (let i = 0; i < results.rows.length; i++) {
            courses.push(results.rows[i]);
        }
        let course = courses.find(c => c.course_id == course_id);
        if (!course) {return res.status(404).send('The course with the given ID was not found')}

        pool.query('DELETE FROM courses WHERE course_id = $1', [course_id], (error, results) => {
            if (error) {throw error}
            return res.status(200).send(`Course deleted with course_id: ${course_id}`)
        })
    })
}


function validateCourse(course){
	const schema = {course_name : Joi.string().min(3).required()}
	return Joi.validate(course,schema);
};


module.exports = {
    getCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
}