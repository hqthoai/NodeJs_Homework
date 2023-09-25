const posts = require('../models/post');

class HomeController {
    index(req, res) {
       res.render('home', {
        title:'Trang chủ Blog',
        data: posts
       });
    }
}

module.exports = new HomeController;