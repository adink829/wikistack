const volleyball = require('volleyball');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const layout = require("./views/layout");
const models = require('./models');
const wiki = require('./routes/wiki');
const user = require('./routes/user');


models.db.authenticate(). //I might need to pass an object with username / password, check docs 
then(() => {
    console.log('connected to the database');
})

app.use(volleyball);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
//console.log(wiki);
app.use('/wiki', wiki);
//app.use('/user', user);

app.get('/', (req, res, next) => {
    res.send(layout("Hello!"));
})


const init = async()=>{
    await models.db.sync();
    const PORT = 1337;
    app.listen(PORT, () => {
        console.log(`App listening in port ${PORT}`);
    });
}

init();