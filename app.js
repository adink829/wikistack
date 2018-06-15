const volleyball = require('volleyball');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const layout = require("./views/layout");
const { db } = require('./models');

db.authenticate(). //I might need to pass an object with username / password, check docs 
then(() => {
    console.log('connected to the database');
})

app.use(volleyball);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));



app.get('/', (req, res, next) => {
    res.send(layout("Hello!"));
})

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
