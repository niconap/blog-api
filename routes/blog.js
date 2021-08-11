var express = require('express');
var router = express.Router();

const authorController = require('../controllers/authorController');
const postController = require('../controllers/postController');

router.get('/', function(req, res, next) {
  res.json({
    message: "Welcome to my blog"
  })
});

router.get('/posts', postController.post_list);
router.post('/posts', verifyToken, postController.post_create);
router.delete('/posts/:id', verifyToken, postController.post_delete);
router.put('/posts/:id', verifyToken, postController.post_update);

router.get('/authors', authorController.author_list);
router.post('/authors', authorController.author_create);

router.get('/posts/:id/comments', postController.comment_list);
router.post('/posts/:id/comments', postController.comment_create);

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ')[1];
    req.token = bearer;
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = router;
