const express = require('express');
const authRouter = require('./routes/auth');

app = express();

app.use('/api/user', authRouter);

app.listen(3000, () => console.log('Listening on port 3000'));
