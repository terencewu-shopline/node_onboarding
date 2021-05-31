class NotFoundError extends Error {
  get name() {
    return 'NotFoundError';
  }

  get status() {
    return 404;
  }
}


module.exports = NotFoundError;
