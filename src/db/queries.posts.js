const Topic = require("./models").Topic;
const Post = require("./models").Post;

module.exports = {
    addPost(newPost, callback){
        return Post.create(newPost)
        .then((post) => {
            console.log(post);
            callback(null, post);
        })
        .catch((err) => {
            callback(err);
        });
    },
    getPost(id, callback){
        return Post.findOne({ where: {id: id} })
        .then((post) => {
            callback(null, post);
        })
        .catch((err) => {
            callback(err);
        })
    },
    deletePost(id, callback){
        return Post.destroy({ where: {id} })
        .then((post) => {
            callback(null, post);
        })
        .catch((err) => {
            callback(err);
        });
    },
    showAllPosts(topicId, callback){
        return Topic.findOne({ where: { id: topicId} })
        .then((topic) => {
            topic.getPosts();
        })
        .then((posts) => {
            callback(null, posts);
        })
        .catch((err) => {
            callback(err);
        });
    }
}