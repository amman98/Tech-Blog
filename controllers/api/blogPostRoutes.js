const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// route for adding a post
router.post('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.create(req.body);

        res.status(200).json(postData);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});


module.exports = router;