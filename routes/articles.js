const express = require('express');
const router = express.Router();
const joiAttempt = require('../helpers/joiAttempt');
const joi = require('joi');
const Article = require('../models/Article');
const NotFoundError = require('../errors/NotFoundError');



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
  const params = joiAttempt(req.body, {
    slug: joi.string().required(),
    title: joi.string().required(),
    content: joi.string(),
    author: joi.string().required(),
    tags: joi.array().items(joi.string()),
  });
  const article = await Article.create(params);
  return res.json(article);
});

router.put('/:id', async (req, res) => {
  let article = await Article.findOne().valid().byId(req.params.id);
  if (!article) {
    throw new NotFoundError('Article Not Found');
  }

  await article.updateOne(req.body);
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
