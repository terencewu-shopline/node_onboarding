const joi = require('joi');
joi.ValidationError.prototype.status = 422;
Object.defineProperty(joi.ValidationError.prototype, 'extras', {
  get: function() {
    return {
      details: this.details
    };
  }
});

const errorHandler = function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

  if (/application\/json/.test(req.get('Content-Type'))) {
    return res.json({
      message: err.message,
      code: err.name,
      extras: err.extras || {},
    })
  }

  res.render('error');
}

module.exports = errorHandler;
