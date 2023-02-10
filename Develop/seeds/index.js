const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const songsData = require('./songsData.json');
const playlistData = require('./playlistData.json')

const seedDatabase = async () => {
    await sequelize.sync({ force: true });


    // const users = await User.bulkCreate(userData, {
    //     individualHooks: true,
    //     returning: true,
    // });

    // const posts = await Post.bulkCreate(postData);

    // for (const posts of postData) {
    //     await Post.create({
    //         ...posts,
    //         user_id: users[Math.floor(Math.random() * users.length)].id,
    //     });
    // }

    // const comment = await Comment.bulkCreate(commentData);

    // for (const comment of commentData) {
    //     await Comment.create({
    //         ...comment,
    //         user_id: users[Math.floor(Math.random() * users.length)].id,
    //     });

    //     await Comment.create({
    //         ...comment,
    //         post_id: posts[Math.floor(Math.random() * posts.length)].id,
    //     });
    // }
    // console.log(comment)
    process.exit(0);
};

seedDatabase();
