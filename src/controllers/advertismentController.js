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
    new(req, res, next){
        res.render("advertisements/new");
    },
    create(req, res, next){
        let newAdvert = {
            title: req.body.title,
            description: req.body.description
        }
        advertisementQuery.addAdvert(newAdvert, (err, advert) => {
            if(err){
                res.redirect(500, 'advertisements/new');
                console.log(err);
            } else {
                res.redirect(303, `/advertisements/${advert.id}/`);
            }
        });
    },
    show(req, res, next){
        advertisementQuery.getAdvert(req.params.id, (advert, err) => {
            if(err || advert == null){
                res.redirect(404, '/');
                console.log(err)
            } else {
                res.render('advertisements/show', {advert});
            }
        });
    },
    edit(req, res, next){
        advertisementQuery.getAdvert(req.params.id, (advert, err) => {
            if(err || advert == null){
                res.redirect(404, "/advertisements");
            } else {
                res.render('advertisements/edit', {advert});
            }
        });
    },
    destroy(req, res, next){
        advertisementQuery.deleteAdvert(req.params.id, (err, advert) => {
            if(err){
                console.log(err)
                res.redirect(500, `advertisements/${advert.id}`);
            } else {
                res.redirect(303, '/advertisements');
            }
        })
    },
    update(req, res, next){
        advertisementQuery.updateAdvert(req.params.id, req.body, (err, advert) => {
            if(err || advert == null){
                res.redirect(404, `/advertisments/${req.params.id}/edit`);
            } else {
                res.render('advertisements/show', {advert});
            }
        });
    }
}