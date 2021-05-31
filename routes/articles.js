const express = require('express');
const router = express.Router();
const joiAttempt = require('../helpers/joiAttempt');
const joi = require('joi');
const Article = require('../models/Article');
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

router.get('/', async (req, res) => {
  const articles = await Article.find().valid();
  return res.json({
    items: articles,
  })
});

router.get('/:id', async (req, res) => {
  const article = await Article.findOne().valid().byId(req.params.id);
  if (!article) {
    throw new NotFoundError('Article Not Found');
  }

  return res.json(article);
});

router.post('/', async (req, res, next) => {
  const params = joiAttempt(req.body, createArticleSchema);
  const article = await Article.create(params);
  return res.json(article);
});

router.put('/:id', async (req, res) => {
  const params = joiAttempt(req.body, updateArticleSchema);
  let article = await Article.findOne().valid().byId(req.params.id);
  if (!article) {
    throw new NotFoundError('Article Not Found');
  }

  await article.updateOne(params);
  article = await Article.findById(article._id);

  return res.json(article);
});

router.delete('/:id', async (req, res) => {
  let article = await Article.findOne().valid().byId(req.params.id);
  if (!article) {
    throw new NotFoundError('Article Not Found');
  }

  await article.destroy();
  article = await Article.findById(article._id);

  return res.json(article);
});

module.exports = router;
