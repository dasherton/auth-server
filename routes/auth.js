const router = require('Express').Router();
const User = require('../models/user');

router.post('/register', async (request, response) => {
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
