require('dotenv').config();
const port = process.env.PORT;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const authRoute = require('./src/routes/auth');
const userRoute = require('./src/routes/users');
const forkRoute = require('./src/routes/forks');
const categoryRoute = require('./src/routes/categories');
const categoryForkRoute = require('./src/routes/categoriesForks');
const userCategoryRoute = require('./src/routes/usersCategories');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/hi', (req, res) => {
    res.send('Hi, switty')
})

app.use('/auth', authRoute);
app.use('/users', userRoute);
app.use('/forks', forkRoute);
app.use('/categories', categoryRoute);
app.use('/categoryFork', categoryForkRoute);
app.use('/userCategory', userCategoryRoute);

app.use((err, req, res, next) => {
    if(!err.status) err.status = 500;
    if(!err.message) err.message = "Something is wrong";
    res.status(err.status).send(err.message);
    console.log('ERROR: ', err);
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});