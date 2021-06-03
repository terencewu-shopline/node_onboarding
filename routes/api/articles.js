const express = require('express');
const router = express.Router();
const ArticleEntity = require('../../entities/ArticleEntity');
const ArticleService = require('../../services/AritcleService');

router.get('/', async (req, res) => {
  const articles = await ArticleService.list();
  return res.json(ArticleEntity.presentCollection(articles));
});

router.get('/:id', async (req, res) => {
  const article = await ArticleService.get(req.params.id);
  return res.json(ArticleEntity.present(article));
});

router.post('/', async (req, res, next) => {
  const article = await ArticleService.create(req.body);
  return res.json(ArticleEntity.present(article));
});

router.put('/:id', async (req, res) => {
  const article = await ArticleService.update(req.params.id, req.body);
  return res.json(ArticleEntity.present(article));
});

router.delete('/:id', async (req, res) => {
  const article = await ArticleService.delete(req.params.id);
  return res.json(ArticleEntity.present(article));
});

module.exports = router;
