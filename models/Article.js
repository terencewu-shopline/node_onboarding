const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  slug: {
    type: String,
  },
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  content: {
    type: String,
  },
  comment_ids: {
    type: mongoose.Types.ObjectId,
  },
  tags: {
    type: [String],
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
