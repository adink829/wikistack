const express = require('express');
const router = express.Router();
const { addPage, wikiPage } = require("../views");
const { Page, User } = require("../models");

const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));


router.get('/', (req, res, next) => {
    res.redirect("../");
})

router.post('/', async (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const title = req.body.title;
    const content = req.body.content;
    const status = req.body.status;

    const page = new Page({
        title: title,
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
        console.log(page);
        console.log(user);
        res.redirect(`/wiki/${page.slug}`);
    }
    catch(err){
        next(err);
    }

})

router.get('/add', (req, res, next) => {
    res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
    try {
        const page = await Page.findOne({
            where: {
                slug:req.params.slug
            }
        });
        res.send(wikiPage(page));
    } catch(error) {
        next(error)
    };
  //res.send(`hit dynamic route at ${req.params.slug}`);
});


module.exports = router;
