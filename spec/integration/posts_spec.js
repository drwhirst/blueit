const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/topics";

const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("routes : posts", () => {
    beforeEach((done) => {
        this.topic;
        this.post;
        sequelize.sync({force: true}).then((res) => {
            Topic.create({
                title: "Did OJ do it?",
                description: "A place to review the evidence and plead your case."
            })
            .then((topic) => {
                this.topic = topic;
                Post.create({
                    title: "If the glove fits...",
                    body: "Then he probably did it.",
                    topicId: this.topic.id
                })
                .then((post) => {
                    this.post = post;
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
            });
        });
    });

    
});