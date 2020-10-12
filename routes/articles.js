const express = require('express');
const Article = require('../models/article');
const articleController = require('../controllers/articleController')
const router = express.Router();

router.get('/create', articleController.create_article_get)

router.post('/create', articleController.create_article_post)

router.get('/edit/:slug', articleController.edit_article_get)

router.get('/:slug', articleController.article_detail)

router.put('/:id', articleController.article_edit_put)

router.delete('/:id', articleController.article_delete)

module.exports = router;