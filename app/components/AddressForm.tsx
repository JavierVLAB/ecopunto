import { useState, ChangeEvent, useEffect, FormEvent } from 'react';
import municipiosData from './provincias_municipios.json';
import { useRouter } from 'next/navigation'
import LocationFetcher from '@/app/components/LocationFetcher';

interface FormData {
  local: string;
  direccion: string;
  municipio: string;
  provincia: string;
  postcode: string;
}

interface MyProps {
  estado: string;
  prev_page: string;
}


const formatName = (name: string) => {
  return name.toLowerCase().replace(/^\w/, c => c.toUpperCase());
};

const AddressForm: React.FC<MyProps> =({estado}) =>{
  const router = useRouter();
  const [provincias] = useState<string[]>(Object.keys(municipiosData));
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState<string>('');
  const [municipios, setMunicipios] = useState<string[]>([]);

  const [isGPSAddress, setIsGPSAddress] = useState(false)

  const [municipioSelect, setMunicipioSelect] = useState('')
  const [dirSelect, setDirSelect] = useState('')
  const [provinciaSelect, setProvinciaSelect] = useState('')
  const [postCodeSelect, setPostCodeSelect] = useState('')

  const [error, setError] = useState(false)

  const [formData, setFormData] = useState<FormData>({
    local: '',
    direccion: '',
    municipio: '',
    provincia: '',
    postcode: '',
  });
    
  useEffect(() => {
	  
    const storedData = JSON.parse(localStorage.getItem('session_data') || '{}');

    


	}, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //console.log('Form Data Submitted:', formData);
    
    const storedData = JSON.parse(localStorage.getItem('session_data') || '{}');

    const originalPage = storedData.originalPage
    const _estado = storedData.estado

    let newData = {}

    if(isGPSAddress){
      newData =
      {
        local: formData.local,
        direccion: dirSelect,
        municipio: municipioSelect,
        provincia: provinciaSelect,
        postcode: postCodeSelect
      }
    } else {
      newData = formData
    }

    if(!isGPSAddress){

      if(formData.provincia && formData.municipio && formData.direccion && formData.postcode){

        if(estado == 'solicitud'){
          if(formData.local){

          } else {
            console.log('aqui')
            setError(true)
            return
          }
        }
      } else {
        setError(true)
        return
      }
    } else {
      if(estado == 'solicitud'){
        if(formData.local){

        } else {
          console.log('aqui')
          setError(true)
          return
        }
      }
    }

    if(!isGPSAddress){
      let address = formData.local ? formData.local + ', ' : ''
      address += formData.direccion + ', ' + formData.municipio + ', ' + formData.provincia + ', ' + formData.postcode
      storedData.addressData = formData;
      storedData.address = address;
    } else {


      storedData.addressData = newData;
      storedData.address = dirSelect;
      
    }

    localStorage.setItem('session_data', JSON.stringify(storedData));
    //console.log(localStorage.session_data)
    //console.log(`estado: ${_estado}`)
    //console.log(`originalPage: ${originalPage}`)

    
    
    
    if(originalPage=="local"){
      if(estado=='lleno'){
        router.push('/confirmacion');
      } 
      if(estado=='solicitud'){
        router.push('/telefono');
      }
    } else {
      router.push('/foto');
    }
    
  };


  const sortedProvincias = provincias
    .map(formatName)
    .sort((a, b) => a.localeCompare(b));

  useEffect(() => {
    console.log(provinciaSeleccionada)
    if (provinciaSeleccionada) {
      //@ts-ignore
      setMunicipios(municipiosData[provinciaSeleccionada] || []);
    } else {
      setMunicipios([]);
    }
  }, [provinciaSeleccionada]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    //console.log(formData)
    setError(false)
  };
  
  const handleProvinciaChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      provincia: e.target.value,
    });
    console.log(e.target.value)
    setProvinciaSeleccionada(e.target.value);
    setError(false)
  };

  const handleMunicipioChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      municipio: e.target.value,
    });
    console.log(`Municipio seleccionado: ${e.target.value}`);
    setError(false)
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-md mx-auto p-4 bg-white" >
      
      <div className=''>
        { estado == 'solicitud' ?
        <div className={`mt-4 ${error ? 'input-with-float-label-error' : 'input-with-float-label'}`}>
          <input
            type="text"
            name="local"
            id="local"
            placeholder=" "
            //value={formData.local}
            onChange={handleChange}
            className=""
          />
          <label htmlFor="local" className="">
            Nombre Establecimiento
          </label>
        </div>
        : <></>}

        <LocationFetcher  onGPS={setIsGPSAddress}
                          onAddress={setDirSelect} 
                          onMunicipio={setMunicipioSelect} 
                          onProvincia={setProvinciaSelect}
                          onPostCode={setPostCodeSelect}/> 



        {!isGPSAddress ?
        <div>
          <div className={`mt-6 mb-6 ${error ? 'input-with-float-label-error' : 'input-with-float-label'}`}>
            <input
              type="text"
              name="direccion"
              id="direccion"
              placeholder=" "
              onChange={handleChange}
            />
            <label htmlFor="direccion" className="block font-body_secondary text-grey04 absolute -top-3 left-2 bg-white px-1">
              Dirección
            </label>
          </div>

          <div className={`mb-6 ${error ? 'input-with-float-label-error' : 'input-with-float-label'}`}>
            <select 
              id="provincia"
              name="provincia"
              onChange={handleProvinciaChange}
              required
            >
              <option value="" selected disabled hidden></option>
              {provincias.map((provincia, index) => (
                <option key={index} value={provincia}>
                  {provincia}
                </option>
              ))}
            </select>
            <label htmlFor="provincia">
              Provincia
            </label>

          </div>

          <div className={`mb-6 ${error ? 'input-with-float-label-error' : 'input-with-float-label'}`}>
            <select
              id="municipio"
              name="municipio"
              disabled={!provinciaSeleccionada}
              onChange={handleMunicipioChange}
              required
            >
              <option value="" selected disabled hidden>Municipio</option>
              {municipios.map((municipio, index) => (
                <option key={index} value={municipio}>
                  {municipio}
                </option>
              ))}
            </select>
            <label htmlFor="municipio" className="">
                Municipio
              </label>
          </div>

          <div className={`mb-4 ${error ? 'input-with-float-label-error' : 'input-with-float-label'}`}>
            <input
              type="text"
              name="postcode"
              id="postcode"
              placeholder=" "
              onChange={handleChange}
            />
            <label htmlFor="postcode" className="block font-body_secondary text-grey04 absolute -top-3 left-2 bg-white px-1">
              Código Postal
            </label>
          </div>

        </div>

      : 
      <div>
        <div className={`mb-6 mt-6 ${error ? 'input-with-float-label-error' : 'input-with-float-label'}`}>
          <input
            type="text"
            name="direccion"
            id="direccion"
            placeholder=" "
            value={dirSelect}
            onChange={handleChange}
          />
          <label htmlFor="direccion" className="block font-body_secondary text-grey04 absolute -top-3 left-2 bg-white px-1">
            Dirección
          </label>
        </div>

        <div className={`mb-6 ${error ? 'input-with-float-label-error' : 'input-with-float-label'}`}>
          <input
            type="text"
            name="provinciaGPS"
            id="provinciaGPS"
            placeholder=" "
            value={provinciaSelect}
            
          />
          <label htmlFor="provinciaGPS" className="block font-body_secondary text-grey04 absolute -top-3 left-2 bg-white px-1">
            Provincia
          </label>
        </div>

        <div className={`mb-6 ${error ? 'input-with-float-label-error' : 'input-with-float-label'}`}>
          <input
            type="text"
            name="municipioGPS"
            id="municipioGPS"
            placeholder=" "
            value={municipioSelect}
          />
          <label htmlFor="municipioGPS" className="block font-body_secondary text-grey04 absolute -top-3 left-2 bg-white px-1">
            Municipio
          </label>
        </div>

        <div className={`mb-4 ${error ? 'input-with-float-label-error' : 'input-with-float-label'}`}>
            <input
              type="text"
              name="postcodeGPS"
              id="postcodeGPS"
              placeholder=" "
              onChange={handleChange}
              value={postCodeSelect}
            />
            <label htmlFor="postcodeGPS" className="block font-body_secondary text-grey04 absolute -top-3 left-2 bg-white px-1">
              Código Postal
            </label>
          </div>

      </div>}

      { error ? <p className='font_body_secondary text-error mb-6 px-5'>Rellena todos los campos
        </p> : <></>}

      </div>
      <div className='fixed inset-x-0 bottom-4 mx-4'>
        <button
          type="submit"
          className="btn_primary_dark"      
        >
          Continuar
        </button>
      </div>
    </form>
  );
};

export default AddressForm;