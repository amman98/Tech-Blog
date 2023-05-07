const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// route for adding a comment
router.post('/', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.create(req.body);

        res.status(200).json(commentData);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});


module.exports = router;