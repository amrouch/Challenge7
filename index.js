const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/register');
const route = require('./routes/login');

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(routes);
app.use(route);


app.use(function (err, req, res, next) {
    res.status(422).send({ error: err.message });
});

app.listen(process.env.port || 4000, function () {
    console.log('now listening for requests')
});