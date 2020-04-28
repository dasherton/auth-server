const router = require('Express').Router();

router.get('/', (request, response) => {
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
