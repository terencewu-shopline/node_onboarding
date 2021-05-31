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
  },
  status: {
    type: String,
    default: 'active',
    enum: ['active', 'removed'],
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});

ArticleSchema.query.valid = function() {
  return this.where({ status: { $ne: 'removed' }});
}

ArticleSchema.query.byId = function(_id) {
  return this.where({ _id });
}

ArticleSchema.methods.destroy = function() {
  return this.updateOne({
    status: 'removed',
  });
}

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
