import axios from 'axios';


export async function envio_CRM(data) {

  const tokens_response = await get_tokens_API()

  console.log(tokens_response)

  try {
    const tokens = tokens_response.access_tokens

    creacion_caso(data, tokens)

  } catch {
    console.log("error al enviar")
  }

}


export async function get_tokens() {

    try {
      const myHeaders = new Headers();
      //myHeaders.append("Cookie", "fpc=AlxCpKz7OSNNljzgT-BuWVa-U9PJAQAAAKT8cd4OAAAA; stsservicecookie=estsfd; x-ms-gateway-slice=estsfd");
      //myHeaders.append("Content-Type", "multipart/form-data");//"application/x-www-form-urlencoded")
      
      console.log(process.env.NEXT_PUBLIC_CRM_CS)
      const formdata = new FormData();
      formdata.append("grant_type", "client_credentials");
      formdata.append("client_id", "c1613d8f-2173-4f41-b559-afe735b3a5b9");
      formdata.append("client_secret", process.env.NEXT_PUBLIC_CRM_CS);
      formdata.append("scope", "https://service.flow.microsoft.com//.default");

      const requestOptions = {
        //mode :'no-cors',
        method: "POST",
        //headers: myHeaders,
        body: formdata,
      };

      const tokenResponse = await fetch("https://login.microsoftonline.com/6d3d1871-d11d-4430-bfdb-65c462c4bd2f/oauth2/v2.0/token", requestOptions)
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.error(error))

      const tokenData = await tokenResponse;
      return tokenData; // Retorna el token
      
  } catch(error) {
    console.log(error)
    throw error;
  }
}


export async function get_tokens_API() {
  
  try {
    // Hacer una llamada a la API de FastAPI para obtener el token
    //const url_api = 'https://ecopunto-gilt.vercel.app/api/token'
    const url_api = 'http://localhost:3000/api/token'
    const response = await fetch(url_api, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    return data
  } catch (error) {
    console.error('Error en Next.js:', error);

  }
}


export async function creacion_caso (data, tokens) {

  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + tokens);
  myHeaders.append("Content-Type", "application/json");
  //myHeaders.append("Cookie", "ARRAffinity=f2f616db1fb852bebf8d33f4c2e809bd2033537707f3f091cc1bbac7ec19b816; ARRAffinitySameSite=f2f616db1fb852bebf8d33f4c2e809bd2033537707f3f091cc1bbac7ec19b816");

  const raw = JSON.stringify({
    "Nombre": "Propelland - Test desde APP",
    "Tipo Cuenta": "",
    "Tipología del Caso": "Solicitar cubo",
    "Calle": "Calle uno numero 2",
    "Teléfono Contacto": "+34 666666666",
    "Dirección": "Calle uno numero 2, Logroño, 22222",
    "Código Postal": "22222",
    "Municipio": "Logroño",
    "Provincia": "La Rioja",
    "Código Provincia": 26,
    "Código Municipio": 26089,
    "Lote": "22CRE00030",
    "Imagen": "",
    "Solicitud cubo": "[{\"CUBO 40 L - PL01748.001\":1},{\"CUBO 90L - PL01748.003\":1},{\"CUBO 120 VACRI - PL01748.005\":2}]",
    "Nombre Establecimiento": "Local Test",
    "Horario": "Tarde, L,X,J,V",
    "Contactar": "Sí"
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("https://prod-58.northeurope.logic.azure.com:443/workflows/bb1255a327a643ca9d76505440580798/triggers/manual/paths/invoke?api-version=2016-06-01", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log("respuesta " + result))
    .catch((error) => console.error(error));

}

export async function send_to_CRM(data) {

  console.log(data)
    
  const url = 'https://prod-66.westeurope.logic.azure.com:443/workflows/8dce564530624a73a46c68373ecbf40b/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=IiuoMPLzbJaquefcOU2gtKVBVcpdw683IiwTXrpkKP4';
	
  try {
    const response = await axios.post(
			url, 
			data1, 
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


export async function send_to_CRM_test(data) {

  const dataCRM = prepare_data(data)

  const myHeaders = new Headers();
  myHeaders.append("x-api-key", "123456");
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "nombre": "algo mas",
    "apellido": "Pérsdddddaaaez",
    "email": "juan.peaaarez@example.com"
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(dataCRM),
    redirect: "follow"
  };

  fetch("https://prod-66.westeurope.logic.azure.com:443/workflows/8dce564530624a73a46c68373ecbf40b/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=IiuoMPLzbJaquefcOU2gtKVBVcpdw683IiwTXrpkKP4", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log("enviado"))
    .catch((error) => console.error(error));

}


const municipio_data = {
	'Dos Hermanas': 
		{'LOTE': '22CRE0003b',
		'COD_MUNICIPIO': 41038,
		'PROVINCIA': 'Sevilla',
		'COD_PROVINCIA': 42,
		'CCAA': 'Andalucía',
		'COD_CCAA': 1},
  'Logroño': 
   	{'LOTE': '22CRE00030',
		'COD_MUNICIPIO': 26089,
		'PROVINCIA': 'La Rioja',
		'COD_PROVINCIA': 26,
		'CCAA': 'La Rioja',
		'COD_CCAA': 17},
  'Alcalá de Henares': 
		{'LOTE': '15CRE00009',
		'COD_MUNICIPIO': 28005,
		'PROVINCIA': 'Madrid',
		'COD_PROVINCIA': 28,
		'CCAA': 'Madrid, Comunidad de',
		'COD_CCAA': 13},
  'Leganés': 
		{'LOTE': '15CRE00010',
		'COD_MUNICIPIO': 28074,
		'PROVINCIA': 'Madrid',
		'COD_PROVINCIA': 28,
		'CCAA': 'Madrid, Comunidad de',
		'COD_CCAA': 13},
  'Santander': 
		{'LOTE': '22CRE00011',
		'COD_MUNICIPIO': 39075,
		'PROVINCIA': 'Cantabria',
		'COD_PROVINCIA': 39,
		'CCAA': 'CANTABRIA',
		'COD_CCAA': 6},
  'Alcalá de Guadaíra': 
		{'LOTE': '22CRE0003C',
		'COD_MUNICIPIO': 41004,
		'PROVINCIA': 'Sevilla',
		'COD_PROVINCIA': 41,
		'CCAA': 'Andalucía',
		'COD_CCAA': 1},
  'Málaga': 
    {'LOTE': '22CRE00005',
    'COD_MUNICIPIO': 29067,
    'PROVINCIA': 'Málaga',
    'COD_PROVINCIA': 29,
    'CCAA': 'Andalucía',
    'COD_CCAA': 1}
}




export function prepare_data (data){

  const miJson = data.solicitudData
  let result = []

  for (const key in miJson) {

      if (miJson.hasOwnProperty(key)) {
          if(miJson[key].size == 90)
            {
              result.push({"CUBO 90L - PL01748.003":miJson[key].quantity})
            } else if(miJson[key].size == 40)
            {
              result.push({"CUBO 40 L - PL01748.001":miJson[key].quantity})
            } else if(miJson[key].size == 120)
            {
              if(data.sistemaElevacion == 'si') {
                result.push({"CUBO 120 VACRI - PL01748.005":miJson[key].quantity})
              } else if(data.sistemaElevacion == 'no') {
                result.push({"CUBO 120L - PL01748.006":miJson[key].quantity})
              } else {
                result.push({"CUBO 120L - PL01748.006":miJson[key].quantity})
              }
            }

      }
  }

  const municipio = data.addressData.municipio 

  const dataCRM = {
    //"Id": "",                                  
    "Nombre": data.incidencia || '',           
    "Tipo Cuenta": "",                      
    "Tipología del Caso": data.incidencia || '',
    "Calle": data.direccion || '',             
    //"Contacto": "",                            
    "Teléfono Contacto": data.phone || '',  
    "Dirección": data.address,                           
    "Calle": data.addressData.direccion,
    "Código Postal": data.addressData.postcode|| '',     
    "Municipio": municipio,         
    "Provincia": municipio_data[municipio]['PROVINCIA'],
    "Código Provincia": municipio_data[municipio]['COD_PROVINCIA'],
    "Código Municipio": municipio_data[municipio]['COD_MUNICIPIO'],                    
    "Lote": municipio_data[municipio]['LOTE'],                                
    "Imagen": data.image || '',               
    "Solicitud Cubo": JSON.stringify(result),  
    "Nombre Establecimiento": data.nameLocal || '',
    "Horario": data.horario || '',
    "Contactar": data.contactar ? 'Sí' : 'No'                    
  }

  console.log(data)
  console.log(dataCRM)

  return dataCRM

}

/*

Id
Nombre
Tipo de cuenta
Tipología del Caso
Calle 
Contacto 
Teléfono Contacto 
Dirección 
Código postal 
Municipio
Código Municipio
Lote 
Imagen
Sulicitud cubo


Cosas

- en la linea 3088 del excel, (3086) hay un unico cod municipio, 41039
- sevilla no es un municipio
- la provincia tiene varios codigos en el caso de sevilla he escogido 41

- definir bien, nombre, tipologi, tipo de caso, y nombre establecimiento



Cubos

Nombre

CUBO 120 ALE HOP - PL01748.004

CUBO 120 VACRI - PL01748.005

CUBO 120L - PL01748.006

CUBO 240 L - PL01748.007

CUBO 40 L - PL01748.001

CUBO 45 L - PL01748.008

CUBO 60 L - PL01748.002

CUBO 90L - PL01748.003

CUBO 90L VACRI ESPECIAL - PL01748.009

*/