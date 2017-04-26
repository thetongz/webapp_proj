var routes = require('express').Router()
var cosmeticController = require('../controller/cosmetic_api')
var postController = require('../controller/post_api')
var path = require('path')

function checkAuthen(req,res,next){
    if(req.cookies.username && req.cookies.auth){
        next()
    }else{
        res.json({message: 'You have to login before like , comment or post'})
    }
}

routes.get('/',function(req,res){
    res.sendFile(path.join(__dirname , '../public/index.html'))
})

routes.get('/getCosmetics',cosmeticController.getCosmetics)

routes.get('/getNewPost' , postController.getNewPost)

routes.get('/getAllPost' , postController.getAllPost)

routes.get('/getPost' , postController.getPost)

routes.get('/like' , checkAuthen , postController.like)

routes.post('/post' , checkAuthen , postController.post)

routes.post('/comment' , checkAuthen , postController.comment)

routes.get('/getOwnPost' , checkAuthen , postController.getOwnPost)

module.exports = routes