const Article = require('../models/article')

exports.create_article_get = function (req, res) {
  res.render('articles/create', { article: new Article() });
}

exports.create_article_post = async function (req, res) {
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
}

exports.edit_article_get = async function (req, res) {
  const article = await Article.findOne({ slug: req.params.slug })
  res.render('articles/edit', { article: article })
}

exports.article_detail = async function (req, res) {
  const article = await Article.findOne({ slug: req.params.slug });
  if (article == null) res.redirect('/')
  res.render('articles/detail', { article: article })
}

exports.article_edit_put = async function(req,res){
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
}

exports.article_delete = async function(req,res){
  await Article.findByIdAndDelete(req.params.id);
  res.redirect('/');
}