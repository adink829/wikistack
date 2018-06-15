const config = require("./config");
const Sequelize = require('sequelize');
//const db = new Sequelize(config.database, config.username, config.password, config.config);
const db = new Sequelize();


const Page = db.define('pages',{
    title: {
        type: Sequelize.STRING,
        validate: {
            notNull: true
        }
    },
    slug: {
        type: Sequelize.STRING,
        validate: {
            notNull: true
        }
    },
    content: {
        type: Sequelize.TEXT,
        validate: {
            notNull: true
        }
    },
    status: {
        type: Sequelize.ENUM('open', 'closed'),
        validate: {
            notNull: true
        }
    }
});

const User = db.define('user',{
    name: {
        type: Sequelize.STRING,
        validate: {
            notNull: true
        }
    },
    email: {
        type: Sequelize.STRING,
        validate: {
            notNull: true,
            isEmail: true
        }
    }
});

module.exports = {db, Page, User};
