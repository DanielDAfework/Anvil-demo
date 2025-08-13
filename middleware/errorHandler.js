// Error handling middleware
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
};

// 404 handler
export const notFoundHandler = (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl
  });
}; 