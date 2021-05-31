const express = require('express');
const router = express.Router();

const Article = require('../models/Article');

router.get('/', async (req, res) => {
  const articles = await Article.find();
  return res.json({
    items: articles,
  })
});

module.exports = router;
