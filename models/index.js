//const config = require("./config");
const Sequelize = require('sequelize');
//const db = new Sequelize(config.database, config.username, config.password, config.config);
//const db = new Sequelize();
const db = new Sequelize('postgres://localhost:5432/wikistack');

const Page = db.define('page',{
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed'),
        allowNull: false
    }
});

function generateSlug (title){
    return title.replace(/\s+/g, '_').replace(/\W/g, '');    
}

Page.beforeValidate(pageInstance, optionsObject, ()=>{
    pageInstance.slug = generateSlug(optionsObject.title); 
});

const User = db.define('user',{
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
});

module.exports = {db, Page, User};
