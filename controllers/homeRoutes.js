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
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch(err) {
        res.status(500).json(err);
    }
});

// view dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  // TODO: get all posts associated with current user
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
    res.render('dashboard', {
        posts,
        logged_in: req.session.logged_in
    });
} catch(err) {
    res.status(500).json(err);
}
});

// view blog post
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
          include: [
            {
              model: User,
              attributes: ['username'],
            },
            {
              model: Comment,
              include: [
                {
                  model: User,
                  attributes: ['username'],
                },
              ],
            },
          ],
        });
    
        const post = postData.get({ plain: true });

        res.render('post', {
          ...post,
          logged_in: req.session.logged_in
        });
      } catch (err) {
        res.status(500).json(err);
      }
});

// add comment to post
router.get('/post/:id/leave-comment', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
          include: [
            {
              model: User,
              attributes: ['username'],
            },
          ],
        });
    
        const post = postData.get({ plain: true });

        res.render('add-comment', {
          ...post,
          user_id: req.session.user_id,
          logged_in: req.session.logged_in
        });
      } catch (err) {
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