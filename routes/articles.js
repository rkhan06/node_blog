const express = require('express');
const Article = require('../models/article');
const router = express.Router();



router.get('/create', function (req, res) {
  res.render('articles/create', { article: new Article() });
})

router.post('/create', async function (req, res) {
  let article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown
  });
  try {
    article = await article.save();
    res.redirect(`/articles/${article.slug}`);
  } catch (err) {
    res.render('articles/create', { article: article });
  }
})

router.get('/edit/:slug', async function (req, res) {
  const article = await Article.findOne({ slug: req.params.slug })
  res.render('articles/edit', { article: article })
})

router.get('/:slug', async function (req, res) {
  const article = await Article.findOne({ slug: req.params.slug });
  if (article == null) res.redirect('/')
  res.render('articles/detail', { article: article })
})

router.put('/:id', async function (req, res) {
  let article = await Article.findById(req.params.id)
  article.title = req.body.title
  article.description = req.body.description
  article.markdown = req.body.markdown
  try {
    article = await article.save();
    res.redirect(`/articles/${article.slug}`);
  } catch (err) {
    res.render(`articles/edit/${article.slug}`, { article: article });
  }
})

router.delete('/:id', async function (req, res) {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect('/');
})

module.exports = router;