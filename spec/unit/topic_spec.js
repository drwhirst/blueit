const sequelize = require('../../src/db/models/index').sequelize;
const Topic = require('../../src/db/models').Topic;
const Post = require("../../src/db/models").Post;

describe("Topic", () => {
    beforeEach((done) => {
        this.topic;
        this.post;
        sequelize.sync({force: true}).then((res) => {
            Topic.create({
                title: "Magical Dogs",
                description: "Magical dogs in popular media."
            })
            .then((topic) => {
                this.topic = topic;
                Post.create({
                    title: "The dog from Neverending Story",
                    body: "it can fucking fly",
                    topicId: this.topic.id
                }).then((post) => {
                    this.post = post;
                    done();
                });
            });
        })
        .catch((err) => {
            console.log(err);
            done();
        });
    });

    describe("#create", () => {
        it("should create a topic", (done) => {
            Topic.create({
                title: "Surfers in Popular Culture",
                description: "Rad bros who love to catch a cool buzz and a nice wave"
            })
            .then((newTopic) => {
                expect(newTopic.title).toBe("Surfers in Popular Culture");
                expect(newTopic.description).toBe("Rad bros who love to catch a cool buzz and a nice wave");
                done();
            });
        });
    });

    describe("getPosts", () => {
        it("should retrieve all posts associated with a topic", (done) => {
            this.topic.getPosts()
            .then((posts) => {
                expect(posts[0].title).toBe("The dog from Neverending Story");
                expect(posts[0].body).toBe("it can fucking fly");
                expect(posts[0].topicId).toBe(this.topic.id);
                done();
            });
        });
    });
});
