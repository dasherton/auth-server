const jwt = require('jsonwebtoken');

module.exports = function (request, response, next) {
	const token = request.header('auth-token');
	if (!token) return response.status(401).send('Access denied!');
	next();
}
