export function notFound(req, res, next) {
  const err = new Error(`Not found: ${req.originalUrl}`);
  err.status = 404;
  next(err);
}

export function errorHandler(err, req, res, next) {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Server error";
  if (status >= 500) {
    console.error(err);
  }
  res.status(status).json({
    success: false,
    message,
    errors: err.errors || undefined,
  });
}
