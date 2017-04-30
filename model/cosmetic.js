var mongoose = require('mongoose')
var autoIncrement = require('mongoose-sequence')

var cosmetic = mongoose.Schema({
    image: String,
    brand: String,
    category: String,
    quality: String,
    color: [{type: String}],
    name: {type: String , unique: true , index:true},
    detail: String,
    like: {
        count: Number,
        who: [{type: String , ref: 'User'}] // collect who like it
    }
})

cosmetic.plugin(autoIncrement, {inc_field: 'id'})

var Cosmetic = module.exports = mongoose.model('Cosmetic', cosmetic)

module.exports.getAllCosmetic = function(callback){
    Cosmetic.find({},callback)
}

module.exports.getSortCosmetic = function(callback){
    Cosmetic.find({}).sort(({id : -1})).exec(callback)
}

module.exports.getCosmeticByCategory = function(category ,callback){
    var query = {category : category}
    Cosmetic.find(query , callback)
}

module.exports.getCosmeticByBrand = function(brand ,callback){
    var query = {brand : brand}
    Cosmetic.find(query , callback)
}

module.exports.addCosmetic = function(cosmetic , callback){
    cosmetic.save(callback)
}

module.exports.getById = function(id , callback){
    var query = {id : id}
    Cosmetic.findOne(query , callback)
}