require('dotenv').config();
const app = require('express')();
const db = require('./db');

db.sync();

app.use(require('./middleware/headers'));
app.use(require('express').json())

app.use('/api/auth', require('./controllers/userController'));
app.use('/api/book', require('./controllers/bookController'));

app.listen(process.env.port, () => console.log(`Spinning on ${process.env.port}`));