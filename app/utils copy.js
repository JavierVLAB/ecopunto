
export async function envio_CRM() {

  const tokens_response = await get_tokens()

  
  console.log("tokens :", tokens_response)

}

export async function get_tokens() {

    try {
      const myHeaders = new Headers();
      //myHeaders.append("Cookie", "fpc=AlxCpKz7OSNNljzgT-BuWVa-U9PJAQAAAKT8cd4OAAAA; stsservicecookie=estsfd; x-ms-gateway-slice=estsfd");
      myHeaders.append("Content-Type", "multipart/form-data");//"application/x-www-form-urlencoded")
      
      console.log(process.env.NEXT_PUBLIC_CRM_CS)
      const formdata = new FormData();
      formdata.append("grant_type", "client_credentials");
      formdata.append("client_id", "c1613d8f-2173-4f41-b559-afe735b3a5b9");
      formdata.append("client_secret", process.env.NEXT_PUBLIC_CRM_CS);
      formdata.append("scope", "https://service.flow.microsoft.com//.default");

      const requestOptions = {
        //mode :'no-cors',
        method: "POST",
        headers: myHeaders,
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


export async function creacion_caso () {

  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ikg5bmo1QU9Tc3dNcGhnMVNGeDdqYVYtbEI5dyIsImtpZCI6Ikg5bmo1QU9Tc3dNcGhnMVNGeDdqYVYtbEI5dyJ9.eyJhdWQiOiJodHRwczovL3NlcnZpY2UuZmxvdy5taWNyb3NvZnQuY29tLyIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzZkM2QxODcxLWQxMWQtNDQzMC1iZmRiLTY1YzQ2MmM0YmQyZi8iLCJpYXQiOjE3MjU5NTcyNDEsIm5iZiI6MTcyNTk1NzI0MSwiZXhwIjoxNzI1OTYxMTQxLCJhaW8iOiJFMmRnWURoVUw2VzE5NWF2b1dudGhCWDdqMXM4QUFBPSIsImFwcGlkIjoiYzE2MTNkOGYtMjE3My00ZjQxLWI1NTktYWZlNzM1YjNhNWI5IiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNmQzZDE4NzEtZDExZC00NDMwLWJmZGItNjVjNDYyYzRiZDJmLyIsImlkdHlwIjoiYXBwIiwib2lkIjoiNDlmMTJmZDItMWU1My00YTAxLTg4N2EtY2E3ODUxZTY3ZmIzIiwicmgiOiIwLkFRd0FjUmc5YlIzUk1FU18yMlhFWXNTOUx5V2g4SDItMDVaTXFsUlpINFBfVkJ5V0FBQS4iLCJzdWIiOiI0OWYxMmZkMi0xZTUzLTRhMDEtODg3YS1jYTc4NTFlNjdmYjMiLCJ0aWQiOiI2ZDNkMTg3MS1kMTFkLTQ0MzAtYmZkYi02NWM0NjJjNGJkMmYiLCJ1dGkiOiJVREluSWNxd1RVU3E2cHFBTjE5N0FBIiwidmVyIjoiMS4wIiwieG1zX2lkcmVsIjoiMiA3In0.CNIGkmvFcNqoKFqdmdbfEajLw3GoU0yWfs_lbbNMnOaoC7B6IGqqCyUWV1YzWczHlRdEJNMxAMCZJzaL-1NjstrQwBuWUaQv02rvGG-vlExUzH2zJv4KfKyhzvCi44ON-4H9hWlseUCKoqvtFNOUDTmkATaDdGRyPJN1d3N8B27WK0si_77nd6wjKtuZ3qcMgrb85YiSy00gp8M_zc4nq8fdeepx5bVAbxdpketqAwDkURp5NdPAtrJ-FOM3--YmFkR-g5w9F9y3w8gpSqgMWp5Z1TSzTvzrCym6vnMdUFHSK19I0NgP4Xs0wuXqDi2bnVpVw6m3crQG9buGxPHgTg");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Cookie", "ARRAffinity=f2f616db1fb852bebf8d33f4c2e809bd2033537707f3f091cc1bbac7ec19b816; ARRAffinitySameSite=f2f616db1fb852bebf8d33f4c2e809bd2033537707f3f091cc1bbac7ec19b816");

  const raw = JSON.stringify({
    "Nombre": "Propelland - Test desde postman",
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
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}
