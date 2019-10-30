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

    describe("Get /topics/:topicId/posts/new", () => {
        it("should render a new posts form", (done) => {
            request.get(`${base}/:topicId/posts/new`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("New Post");
                done();
            });
        })
    });

    describe("POST /topics/:topicId/posts/create", () => {
        it("should create a new post and reditrect", (done) => {
            const options = {
                url: `${base}/${this.topic.id}/posts/create`,
                form: {
                    title: "White prejudice",
                    body: "White people have an internal bias."
                }
            };
            request.post(options, (err, res, body) => {
                Post.findOne({where: {title: "White prejudice"}})
                .then((post) => {
                    expect(post).not.toBeNull();
                    expect(post.title).toBe("White prejudice");
                    expect(post.body).toBe("White people have an internal bias.");
                    expect(post.topicId).not.toBeNull();
                    done();
                })
                .catch((err) => {
                    console.log(err)
                    done();
                });
            });
        });
    });

    describe("GET /topics/:topicId/posts/:id", () => {
        it("should render a view with the selected post", (done) => {
            request.get(`${base}/:topicId/posts/${this.post.id}`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("Then he probably did it.")
                done();
            });
        });
    });

    describe("POST /topics/topicId/posts/:id/destroy", () => {
        it("should delete the post with the associated ID", (done) => {
            expect(this.post.id).toBe(1);
            request.post(`${base}/${this.topic.id}/posts/${this.post.id}/destroy`, (err, res, body) => {
                Post.findOne({ where: {id: 1} })
                .then((post) => {
                    expect(err).toBeNull();
                    expect(post).toBeNull();
                    done();
                });
            });
        })
    });
});