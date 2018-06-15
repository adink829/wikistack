const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');

// module.exports = {
//     db
// }

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