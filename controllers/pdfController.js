import { generatePDF, savePDFToFile } from '../services/anvilService.js';
import { createAgreement } from '../services/agreementService.js';
import { config } from '../config/database.js';

export const savePDF = async (req, res) => {
  try {
    const payload = req.body;

    const pdfData = await generatePDF(payload);

    const filename = `filled_lease_${Date.now()}.pdf`;
    const filePath = await savePDFToFile(pdfData, filename);

    // Save agreement data to database
    const agreementData = {
      ...payload,
      pdfFilename: filename
    };
    
    await createAgreement(agreementData);

    res.json({
      message: 'PDF filled and saved successfully!',
      filename: filename,
      filePath: filePath,
      fileSize: pdfData.length,
      downloadUrl: `http://localhost:${config.port}/agreements/${filename}`
    });

  } catch (err) {
    console.error('❌ Error filling PDF:', err);
    
    if (err.message.includes('Anvil API key not configured')) {
      return res.status(500).json({ 
        error: 'Anvil API key not configured',
        details: 'Please set the ANVIL_API_KEY environment variable to use PDF filling functionality.'
      });
    }
    
    res.status(500).json({ 
      error: err.message,
      details: 'Failed to fill PDF. Check your API key and template ID.'
    });
  }
}; 