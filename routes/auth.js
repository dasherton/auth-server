const router = require('Express').Router();
const User = require('../models/user');
const { registerValidation } = require('../validation');
const bcrypt = require('bcrypt');

router.post('/register', async (request, response) => {

	const {error} = registerValidation(request.body);
	if(error) return response.status(400).send(error.details[0].message);

	const emailExists = await User.findOne({email: request.body.email});
	if(emailExists) return response.status(400).send('Email already exists');

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

router.post('/login', (request, response) => {
})

module.exports = router;
