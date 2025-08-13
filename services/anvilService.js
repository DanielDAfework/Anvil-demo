import fs from 'fs';
import { anvilClient, config } from '../config/database.js';
import Anvil from '@anvilco/anvil';

export const generatePDF = async (payload) => {
  try {
    if (!anvilClient) {
      throw new Error('Anvil API key not configured');
    }

    const { statusCode, data } = await anvilClient.fillPDF(config.anvilTemplateId, payload, {
      dataType: 'buffer',
      versionNumber: Anvil.VERSION_LATEST
    });

    if (statusCode !== 200) {
      throw new Error(`Failed to fill PDF. Status code: ${statusCode}`);
    }

    return data;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

export const savePDFToFile = async (pdfData, filename) => {
  try {
    const filePath = `agreements/${filename}`;
    fs.writeFileSync(filePath, pdfData, { encoding: null });
    console.log('PDF saved as:', filePath);
    return filePath;
  } catch (error) {
    console.error('Error saving PDF:', error);
    throw error;
  }
}; 