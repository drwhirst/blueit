module.exports = {
    index(req,res, next) {
        res.render("static/index", {title: "Welcome to Blueitt!"});
    },

    about(req, res, next) {
        res.render("static/about", {title: "About Blueitt."})
    },
}