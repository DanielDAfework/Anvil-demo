import express from 'express';
import { getAllAgreements, getAgreementById } from '../services/agreementService.js';

const router = express.Router();

// Get all agreements
router.get("/", async (req, res) => {
  try {
    const agreements = await getAllAgreements();
    res.json({
      agreements: agreements.toJSON()
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch agreements',
      details: error.message
    });
  }
});

// Get all agreements (formatted for easier reading)
router.get("/formatted", async (req, res) => {
  try {
    const agreements = await getAllAgreements();
    const formattedAgreements = agreements.map(agreement => {
      const data = agreement.get('agreement_data');
      return {
        id: agreement.get('id'),
        tenant: {
          firstName: data.data.tenantName.firstName,
          lastName: data.data.tenantName.lastName,
          middleInitial: data.data.tenantName.mi
        },
        landlord: {
          firstName: data.data.landlordName.firstName,
          lastName: data.data.landlordName.lastName,
          middleInitial: data.data.landlordName.mi
        },
        property: {
          address: agreement.get('property_address'),
          street1: data.data.propertyAddress.street1,
          street2: data.data.propertyAddress.street2,
          city: data.data.propertyAddress.city,
          state: data.data.propertyAddress.state,
          zip: data.data.propertyAddress.zip,
          country: data.data.propertyAddress.country
        },
        lease: {
          startDate: data.data.leaseStartDate,
          endDate: data.data.leaseEndDate,
          monthlyRent: data.data.monthlyRentAmount,
          securityDeposit: data.data.securityDepositAmount,
          lateFee: data.data.lateFeeAmount,
          returnedCheckFee: data.data.returnedCheckFee,
          holdOverRent: data.data.tenantsHoldOverRentAmount,
          animalFee: data.data.animalFee
        },
        agreement: {
          date: data.data.agreementDate,
          month: data.data.agreementMonth,
          day: data.data.agreementDay,
          year: data.data.agreementYear
        },
        pdfFilename: agreement.get('pdf_filename'),
        createdAt: agreement.get('created_at'),
        updatedAt: agreement.get('updated_at')
      };
    });
    
    res.json({
      count: formattedAgreements.length,
      agreements: formattedAgreements
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch agreements',
      details: error.message
    });
  }
});

// Get agreement by ID
router.get("/:id", async (req, res) => {
  try {
    const agreement = await getAgreementById(req.params.id);
    if (!agreement) {
      return res.status(404).json({
        error: 'Agreement not found'
      });
    }
    res.json({
      agreement: agreement.toJSON()
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch agreement',
      details: error.message
    });
  }
});

export default router; 