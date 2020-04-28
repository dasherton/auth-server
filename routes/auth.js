const router = require('Express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');

const findUser = email => User.findOne({email: email});

router.post('/register', async (request, response) => {

	const {error} = registerValidation(request.body);
	if(error) return response.status(400).send(error.details[0].message);
	
	const existingUser = await findUser(request.body.email);
	if(existingUser) return response.status(400).send('Email already exists');
	
	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(request.body.password, salt);
	
	const user = new User({
		name: request.body.name,
		email: request.body.email,
		password: hashPassword
	});
	
	try {
		const saved = await user.save();
		response.send({user: user._id});
	} catch(err) {
		response.status(400).send(err);
	}
});

router.post('/login', async (request, response) => {
	const {error} = loginValidation(request.body);
	if(error) return response.status(400).send(error.details[0].message);

	const user = await findUser(request.body.email);
	if(!user) return response.status(400).send('Email does not exist');

	const validPassword = await bcrypt.compare(request.body.password, user.password);
	if(!validPassword) return response.status(400).send('Password is incorrect');
	
	const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
	response.header('auth-token', token).send(token);
});

module.exports = router;
