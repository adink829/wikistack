const express = require('express');
const router = express.Router();
const { addPage } = require("../views");
const { Page, User } = require("../models");

const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));


router.get('/', (req, res, next) => {
    res.redirect("../");
})

router.post('/', async (req, res, next) => {
    res.json(req.body);
    const name = req.body.name;
    const email = req.body.email;
    const title = req.body.title;
    const content = req.body.content;
    const status = req.body.status;
    // const slug = generateSlug(title);


    const page = new Page({
        title: title,
        //slug: slug,
        content: content,
        status: status
    })
    const user = new User({
        name: name,
        email: email
    })

    try {
        await page.save();
        await user.save(); 
        res.redirect('/');
    }
    catch(err){
        next(err);
    }

})

router.get('/add', (req, res, next) => {
    res.send(addPage());
});

module.exports = router;
