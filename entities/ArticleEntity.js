const ArticleEntity = {
  present(object) {
    return {
      id: object._id,
      slug: object.slug || '',
      title: object.title || '',
      content: object.content || '',
      author: object.author || '',
      tags: object.tags || [],
      comment_ids: object.comment_ids || [],
    }
  },
  presentCollection(objects) {
    return {
      items: objects.map(object => this.present(object)),
    };
  }
}

module.exports = ArticleEntity;
