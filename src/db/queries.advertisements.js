const Advertisement = require("./models").Advertisement;

module.exports = {
    getAllAdvertisements(callback){
        return Advertisement.findAll()
        .then((advertisements) => {
            callback(null, advertisements);
        })
        .catch((err) => {
            callback(err);
        });
    },
    addAdvert(advert, callback){
        return Advertisement.create({
            title: advert.title,
            description: advert.description
        })
        .then((advert) => {
            callback(null, advert);
        })
        .catch((err) => {
            callback(err);
        })
    },
    getAdvert(id, callback){
        return Advertisement.findOne({ where: { id: id } })
        .then((advert) => {
            callback(advert);
        })
        .catch((err) => {
            callback(err);
        });
    },
    deleteAdvert(id, callback){
        return Advertisement.destroy({ where: {id} })
        .then((advert) => {
            callback(null, advert);
        })
        .catch((err) => {
            callback(err);
        })
    }
}