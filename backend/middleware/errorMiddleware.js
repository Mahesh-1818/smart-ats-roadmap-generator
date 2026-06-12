const notFound = (req, res, next) => {
  const error = new Error(`Route ${req.method} ${req.originalUrl} not found`);
  error.statusCode = 404;
  next(error);
};

const errorHandler = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  const isDev = process.env.NODE_ENV === "development";

  // ─── Normalise Status Code ───────────────────────────────────────────────────
  let statusCode = err.statusCode || err.status || 500;

  // Mongoose: cast error (invalid ObjectId)
  if (err.name === "CastError") {
    statusCode = 400;
    err.message = `Invalid ${err.path}: ${err.value}`;
  }

  // Mongoose: duplicate key (unique index violation)
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue || {})[0] || "field";
    const value = err.keyValue?.[field] || "";
    err.message = `${field.charAt(0).toUpperCase() + field.slice(1)} '${value}' is already in use`;
  }

  // Mongoose: validation error
  if (err.name === "ValidationError") {
    statusCode = 422;
    err.message = Object.values(err.errors)
      .map((e) => e.message)
      .join(". ");
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    err.message = "Invalid token. Please log in again";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    err.message = "Your session has expired. Please log in again";
  }

  // ─── Response ────────────────────────────────────────────────────────────────
  res.status(statusCode).json({
    success: false,
    statusCode,
    message: err.message || "Internal Server Error",
    ...(isDev && {
      stack: err.stack,
      error: err,
    }),
  });
};

module.exports = { notFound, errorHandler };