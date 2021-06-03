const express = require('express');
const router = express.Router();
const ArticleService = require('../services/AritcleService');

// list article page
router.get('/', async (req, res) => {
  const articles = await ArticleService.list();
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
  const article = await ArticleService.create(req.body);
  return res.redirect(req.originalUrl + '/' + article._id);
});

// show article page
router.get('/:id', async (req, res) => {
  const article = await ArticleService.get(req.params.id);
  return res.render('articles/show', {
    article: article,
  });
});

// edit article action
router.post('/:id', async (req, res) => {
  await ArticleService.update(req.params.id, req.body);
  return res.redirect('/articles');
});

module.exports = router;
