const router = require('Express').Router();
const verifyToken = require('./verifyToken');

router.get('/', verifyToken, (request, response) => {
	response.json({
		posts: [
			{
				title: 'My first post',
				description: 'A very simple post'
			}
		]
	});
});

module.exports = router;
