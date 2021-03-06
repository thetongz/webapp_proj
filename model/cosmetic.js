var mongoose = require('mongoose')
var autoIncrement = require('mongoose-sequence')

var cosmetic = mongoose.Schema({
    id: Number,
    image: String,
    brand: String,
    category: String,
    quality: String,
    color: [{ type: String }],
    name: { type: String, unique: true, index: true },
    detail: String
})

cosmetic.plugin(autoIncrement, { inc_field: 'id' })

var Cosmetic = module.exports = mongoose.model('Cosmetic', cosmetic)

module.exports.getAllCosmetic = function(callback) {
    Cosmetic.find({}).select({ name: 1, id: 1 }).exec(callback)
}

module.exports.getSortCosmetic = function(callback) {
    Cosmetic.find({}).sort(({ id: -1 })).exec(callback)
}

module.exports.getCosmeticByCategory = function(category, callback) {
    var query = { category: category }
    Cosmetic.find(query).select({ id: 1, name: 1, brand: 1, image: 1 }).exec(callback)
}

module.exports.getCosmeticByBrand = function(brand, callback) {
    var query = { brand: brand }
    Cosmetic.find(query, callback)
}

module.exports.addCosmetic = function(cosmetic, callback) {
    cosmetic.save(callback)
}

module.exports.getByIds = function(id, callback) {
    Cosmetic.find().where({ id: { $in: id } }).select({ id: 1, name: 1, brand: 1, image: 1 }).exec(callback)
}

module.exports.getCosmeticById = function(id, callback) {
    var query = { id: id }
    Cosmetic.findOne(query, callback)
}

module.exports.save = function(cosmetic, callback) {
    var query = { id: cosmetic.id }
    Cosmetic.findOne(query, function(err, data) {
        data = cosmetic
        data.save(callback)
    })
}