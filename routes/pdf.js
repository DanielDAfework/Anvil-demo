import express from 'express';
import { savePDF } from '../controllers/pdfController.js';

const router = express.Router();

// Save PDF and create agreement record
router.post("/save-pdf", savePDF);

export default router; 