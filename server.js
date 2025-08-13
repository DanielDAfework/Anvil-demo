// server.js
import express from 'express';
import routes from './routes/index.js';
import pdfRoutes from './routes/pdf.js';
import agreementRoutes from './routes/agreements.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { config } from './config/database.js';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/agreements', express.static('agreements'));

// Routes
app.use('/', routes);
app.use('/pdf', pdfRoutes);
app.use('/agreements', agreementRoutes);

// Error handling
app.use('*', notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(config.port, '127.0.0.1', () => {
  console.log(`🚀 Server running on http://127.0.0.1:${config.port}`);
});
