class ValidateError extends Error {}
class NoFoundError extends Error {}

function errorHandler(err, req, res, next) {
  console.error(err);
  const message = err instanceof ValidateError ? err.message : 'Proszę spróbować później...';
  const code = err instanceof ValidateError ? 400 : 500;

  if (err instanceof NoFoundError) {
    res.status(404);
    res.render('error', { message: err.message });
    return;
  }

  res.status(code);
  res.render('error', { message });
}

function catchAsync(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => next(err));
  };
}

module.exports = {
  catchAsync,
  errorHandler,
  ValidateError,
  NoFoundError,
};
