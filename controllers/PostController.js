const posts = require('../models/post');
const uuid = require('uuid'); 

class PostController {
    show (req, res) {
        const item = posts.find((item)=> item.id === req.params.id);
        res.render('posts/detail', {
            data: item
       });
    }

    create (req,res) {
        res.render('posts/create', {
            title:'Tạo post'
        })
    }

    edit (req,res) {
        const item = posts.find((item)=> item.id === req.params.id);
        res.render('posts/edit', {
            title:'Edit post',
            data:item
        })
    }

    add (req,res) {
        const postId = uuid.v4();
        const comments = [];
        req.body.id = postId;
        req.body.comments = comments;
        const data = req.body;
        const post = posts.find((item) => item.id === req.body.id);
        if (post) {
            res.redirect('back');
        }
        posts.push(data);
    
        res.redirect('/');
    }

    update (req,res) {
        let pos;
        
        const data = req.body;
        const post = posts.find((item, index) => {
            if (item.id === req.body.id){
                pos = index;
                return item;
            }
        });

        if (post) {
            posts[pos].title = data.title;
            posts[pos].description = data.description;
            posts[pos].content = data.content;
        }

        res.redirect('/');
    }

    delete (req,res) {
        let pos ;
        const post = posts.find((item,index) => {
            if (item.id === req.params.id) {   
                pos = index
                return item
            }
        });

        if (post) {
            posts.splice(pos,1);
            res.redirect('/');
        }
        else {
            res.redirect('back');
        }
    }

    addComment(req,res) {
        const comment = req.body.comment;

        const post = posts.find((item) => item.id === req.params.id);
        post.comments.push(comment);
        res.redirect('back');
    }

}

module.exports = new PostController;