import Agreement from '../models/Agreement.js';

export const createAgreement = async (agreementData) => {
  try {
    const agreement = new Agreement({
      tenant_first_name: agreementData.data.tenantName.firstName,
      tenant_last_name: agreementData.data.tenantName.lastName,
      property_address: `${agreementData.data.propertyAddress.street1}, ${agreementData.data.propertyAddress.city}, ${agreementData.data.propertyAddress.state} ${agreementData.data.propertyAddress.zip}`,
      agreement_data: agreementData,
      pdf_filename: agreementData.pdfFilename || null
    });

    const savedAgreement = await agreement.save();
    console.log('Agreement saved to database:', savedAgreement.get('id'));
    return savedAgreement;
  } catch (error) {
    console.error('Error saving agreement to database:', error);
    throw error;
  }
};

export const getAllAgreements = async () => {
  try {
    const agreements = await Agreement.fetchAll();
    return agreements;
  } catch (error) {
    console.error('Error fetching agreements:', error);
    throw error;
  }
};

export const getAgreementById = async (id) => {
  try {
    const agreement = await Agreement.where('id', id).fetch();
    return agreement;
  } catch (error) {
    console.error('Error fetching agreement by ID:', error);
    throw error;
  }
}; 