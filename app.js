const volleyball = require('volleyball');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const layout = require("./views/layout");
const models = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');


models.db.authenticate(). //I might need to pass an object with username / password, check docs
then(() => {
    console.log('connected to the database');
})

app.use(volleyball);
app.use('/wiki', wikiRouter);
app.use('/user', userRouter);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
// console.log(wiki);

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
