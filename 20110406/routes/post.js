const express = require('express');
const router = express.Router();
const postController = require('../controllers/PostController');


router.get('/create', postController.create);
router.post('/add', postController.add);

router.get('/:id/edit', postController.edit);
router.put('/:id/update', postController.update);

router.delete('/:id/delete', postController.delete);

router.post('/:id/comment', postController.addComment);

router.get('/:id', postController.show);


module.exports = router;