const advertisementQuery = require("../db/queries.advertisements.js");

module.exports = {
    index(req, res, next){
        advertisementQuery.getAllAdvertisements((err, advertisements) => {
            if(err){
                res.redirect(500, '/')
                console.log(err)
            } else {
                res.render('advertisements/index', {advertisements})
            }
        });
    },
}