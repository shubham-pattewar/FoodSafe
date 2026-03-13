// Global error handler middleware
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  // Specific catch for Multer errors
  if (err.name === 'MulterError' && err.message === 'File too large') {
    return res.status(413).json({
      message: 'Image size exceeds maximum allowed upload size (20MB). Please try a smaller file.',
    });
  }

  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { errorHandler };
