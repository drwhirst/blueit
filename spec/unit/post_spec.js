const sequelize = require('../../src/db/models/index').sequelize;
const Topic = require('../../src/db/models').Topic;
const Post = require("../../src/db/models").Post;

describe("Post", () => {
    beforeEach((done) => {
        this.topic;
        this.post;
        sequelize.sync({force: true}).then((res) => {
            Topic.create({
                title: "Expeditions to Alpha Centauri",
                description: "A compilation of reports from recent visits to the star system."
            })
            .then((topic) => {
                this.topic = topic;
                Post.create({
                    title: "My first visit to Proxima Centauri b",
                    body: "I saw some rocks.",
                    topicId: this.topic.id
                })
                .then((post) => {
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

    describe("#create()", () => {
        it("Should create a post object with a title, body and be associated with a topic", (done) => {
            Post.create({
                title: "Pros of Cryosleep during the long journey",
                body: "1. Not having to answer the 'are we there yet?' question.",
                topicId: this.topic.id 
            })
            .then((post) => {
                expect(post.title).toBe("Pros of Cryosleep during the long journey");
                expect(post.body).toBe("1. Not having to answer the 'are we there yet?' question.");
                done();
            })
        });

        it("Should create a post with a missing title, body or assigned topic and throw a validation error", (done) => {
            Post.create({
                title: "Pros of cryosleep during the long journey"
            })
            .then((post) => {
                done();
            })
            .catch((err) => {
                expect(err.message).toContain("Post.body cannot be null");
                expect(err.message).toContain("Post.topicId cannot be null");
                done();
            });
        });
    });

    describe('#setTopic', () => {
        it("Should associate a post and a topic", (done) => {
            Topic.create({
                title: "Famous dogs",
                description: "A list of famous dogs."
            })
            .then((newTopic) => {
                expect(this.post.topicId).toBe(this.topic.id);
                this.post.setTopic(newTopic)
                .then((newPost) => {
                    expect(this.post.topicId).toBe(newTopic.id);
                    done();
                });
            });
        });
    });

    describe("#getTopic", () => {
        it("should return the associated topic", (done) => {
            this.post.getTopic()
            .then((assocTopic) => {
                expect(assocTopic.title).toBe("Expeditions to Alpha Centauri");
                done();
            })
        })
    });
});