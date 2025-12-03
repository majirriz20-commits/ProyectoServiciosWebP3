function logErrors(err, req, res, next) {
    console.error(err);
    next(err);
}
function errorHandler(err, req, res, next) {
    res.status(err.statusCode || 500).json({
        message: err.message || "Error interno del servidor",
    });
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}

module.exports = { logErrors, errorHandler, boomErrorHandler };
