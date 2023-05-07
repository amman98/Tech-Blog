const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// view homepage
router.get('/', async (req, res) => {
    try {
        // get all blog posts
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'], // don't want to include password in result
                },
            ],
        });

        // serialize data
        const posts = postData.map((post) => post.get({plain: true}));

        // render homepage with all blog posts
        console.log("Posts: " + JSON.stringify(posts));
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch(err) {
        res.status(500).json(err);
    }
});

// view login page
router.get('/login', (req, res) => {
    // if the user is already logged in, redirect to homepage
    if(req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

// view sign up page
router.get('/signup', (req, res) => {
    // if the user is already logged in, redirect to homepage
    if(req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('signup');
});

module.exports = router;