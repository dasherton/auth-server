const router = require('Express').Router();

router.post('/register', (request, response) => {
	response.send('register');
});

module.exports = router;
