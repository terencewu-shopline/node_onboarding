const joi = require('joi');
const Article = require('../models/Article');
const NotFoundError = require('../errors/NotFoundError');
const joiAttempt = require('../helpers/joiAttempt');

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

const ArticleService = {
  async create(params) {
    const data = joiAttempt(params, createArticleSchema);

    const article = await Article.create(data);

    return article;
  },
  async update(id, params) {
    let article = await this.get(id);

    const data = joiAttempt(params, updateArticleSchema);
    await article.updateOne(data);

    article = await Article.findById(article._id);
    return article;
  },
  async list() {
    const articles = await Article.find().valid();
    return articles;
  },
  async get(id) {
    const article = await Article.findOne().valid().byId(id);
    if (!article) {
      throw new NotFoundError('Article Not Found');
    }

    return article;  
  },
  async delete() {
    let article = await this.get(id);

    await article.destroy(params);

    article = await Article.findById(article._id);
    return article;
  }
}


module.exports = ArticleService;
