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

// route for updating a post
router.put('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.update(
            {
                title: req.body.title,
                content: req.body.content,
            },
            {
                where: {
                    title: req.body.title,
                },
            }
        );

        if(!postData) {
            res.status(404).json({ message: "No post found with this title" });
            return;
        }

        const successResponse = {
            success: "success",
            postData
        };

        res.status(200).json(successResponse);
    } catch(err) {
        console.log(err);
        res.status(400).json(err);
    }
});

// route for deleting a post
router.delete('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy(
            {
                where: {
                    title: req.body.title,
                },
            }
        );

        if(!postData) {
            res.status(404).json({ message: "No post found with this title" });
            return;
        }

        const successResponse = {
            success: "success",
            postData
        };

        res.status(200).json(successResponse);
    } catch(err) {
        console.log(err);
        res.status(400).json(err);
    }
});

module.exports = router;