const router = require('Express').Router();
const User = require('../models/user');

router.post('/register', (request, response) => {
	const user = new User({
		name: 'David',
		email: 'My Email',
		password: '12345'
	});

	response.send(user);
});

module.exports = router;
