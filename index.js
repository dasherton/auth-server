const express = require('express');
const authRouter = require('./routes/auth');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

app = express();

dotenv.config('.env');

app.use('/api/user', authRouter);

app.listen(3000, () => console.log('Listening on port 3000'));

mongoose.connect(
	process.env.DB_CONNECT,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => console.log('Connected to db')
);
