const router = require('Express').Router();
const User = require('../models/user');
const Joi = require('@hapi/joi');

const schema = Joi.object({ 
	name: Joi.string()
		.required(),
	email: Joi.string()
		.required()
		.email(),
	password: Joi.string()
		.min(6)
		.required()
});

router.post('/register', async (request, response) => {

	const {error} = schema.validate(request.body);

	if(error) {
		return response.status(400).send(error.details[0].message);
	}

	const user = new User({
		name: request.body.name,
		email: request.body.email,
		password: request.body.password
	});

	try {
		const saved = await user.save();
	} catch(err) {
		response.status(400).send(err);
		response.send(saved);
	}

	response.send('Save user to database!');
});

module.exports = router;
