const postQuery = require("../db/queries.posts")

module.exports = {
    new(req, res, next){
        res.render("posts/new", {topicId: req.params.topicId});
    },
    create(req, res, next){
        let newPost = {
            title: req.body.title,
            body: req.body.body,
            topicId: req.params.topicId
        };
        postQuery.addPost(newPost, (err, post) => {
            if(err){
                res.redirect(500, "/posts/new");
            } else {
                res.redirect(303, `/topics/${newPost.topicId}/posts/${post.id}`);
            }
        });
    },
    show(req, res , next){
        postQuery.getPost(req.params.id, (err, post) => {
            if(err || post == null){
                res.redirect(404, "/");
            } else {
                res.render("posts/show", {post});
            }
        });
    },
    destroy(req, res, next){
        postQuery.deletePost(req.params.id, (err, post) => {
            if(err){
                res.redirect(500, `/topics/${req.params.topicId}/posts/${req.params.id}`);
            } else {
                res.redirect(303, `/topics/${req.params.topicId}`);
            }
        })
    },
    showAll(req, res, next){
        postQuery.showAllPosts(1, (err, posts) => {
            res.render('posts/showall', {posts})
        })
    }
}