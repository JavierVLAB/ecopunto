import axios from 'axios';

export const send_to_CRM = async (data) => {
    
  const url = 'https://prod-66.westeurope.logic.azure.com:443/workflows/8dce564530624a73a46c68373ecbf40b/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=IiuoMPLzbJaquefcOU2gtKVBVcpdw683IiwTXrpkKP4';
	
  try {
    const response = await axios.post(
			url, 
			data, 
			{
				headers: {
					'Content-Type': 'application/json',
				},
    });
    return response.data;
  } catch (error) {
    console.error('Error al enviar los datos:', error);
    throw error;
  }
};
