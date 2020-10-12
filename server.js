const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const articleRouter = require('./routes/articles');
const Article = require('./models/article');


const app = express();
app.set('view engine', 'ejs');
app.use(methodOverride('_method'))
var monodb = 'mongodb+srv://rameen:google@cluster0.df0iw.mongodb.net/blog?retryWrites=true&w=majority';
mongoose.connect(monodb, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

app.use(express.urlencoded({ extended: false }))

app.use('/articles', articleRouter)
app.get('/', async function (req, res) {
  const articles = await Article.find();
  res.render('articles/index', { 'articles': articles });
})



app.listen(3000);