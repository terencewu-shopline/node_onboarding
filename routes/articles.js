const express = require('express');
const router = express.Router();
const joiAttempt = require('../helpers/joiAttempt');
const joi = require('joi');
const Article = require('../models/Article');
const ArticleEntity = require('../entities/ArticleEntity');
const NotFoundError = require('../errors/NotFoundError');


const articleSchema = {
  slug: joi.string(),
  title: joi.string(),
  content: joi.string(),
  author: joi.string(),
  tags: joi.array().items(joi.string()),
};

const createArticleSchema = {
  ...articleSchema,
  slug: articleSchema.slug.required(),
  title: articleSchema.title.required(),
  author: articleSchema.author.required(),
};

const updateArticleSchema = {
  ...articleSchema,
  slug: articleSchema.slug.forbidden(),
};

// list article page
router.get('/', async (req, res) => {
  const articles = await Article.find().valid();

  return res.render('articles/index', {
    articles: articles,
  });
});

// create article page
router.get('/new', async (req, res) => {
  return res.render('articles/new');
});

// create article action
router.post('/', async (req, res, next) => {
  const params = joiAttempt(req.body, createArticleSchema);
  const article = await Article.create(params);
  return res.redirect(req.originalUrl + '/' + article._id);
});

// show article page
router.get('/:id', async (req, res) => {
  const article = await Article.findOne().valid().byId(req.params.id);
  if (!article) {
    throw new NotFoundError('Article Not Found');
  }

  return res.render('articles/show', {
    article: article,
  });
});

// edit article action
router.post('/:id', async (req, res) => {
  const params = joiAttempt(req.body, updateArticleSchema);
  let article = await Article.findOne().valid().byId(req.params.id);
  if (!article) {
    throw new NotFoundError('Article Not Found');
  }

  await article.updateOne(params);

  return res.redirect('/articles');
});

router.delete('/:id', async (req, res) => {
  let article = await Article.findOne().valid().byId(req.params.id);
  if (!article) {
    throw new NotFoundError('Article Not Found');
  }

  await article.destroy();
  article = await Article.findById(article._id);

  return res.json(ArticleEntity.present(article));
});

module.exports = router;
