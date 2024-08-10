import { useState, ChangeEvent, useEffect, FormEvent } from 'react';
import municipiosData from './provincias_municipios.json';
import { useRouter } from 'next/navigation'
import LocationFetcher from '@/app/components/LocationFetcher';

interface FormData {
  local: string;
  direccion: string;
  municipio: string;
  provincia: string;
}

interface MyProps {
  estado: string;
  prev_page: string;
}


const formatName = (name: string) => {
  return name.toLowerCase().replace(/^\w/, c => c.toUpperCase());
};

const AddressForm: React.FC<MyProps> =({estado, prev_page}) =>{
  const router = useRouter();
  const [provincias] = useState<string[]>(Object.keys(municipiosData));
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState<string>('');
  const [municipios, setMunicipios] = useState<string[]>([]);

  const [formData, setFormData] = useState<FormData>({
    local: '',
    direccion: '',
    municipio: '',
    provincia: '',
  });

    
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData)
    //console.log(e.target.name)
    //console.log(e.target.value)
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('Form Data Submitted:', formData);
    
    const storedData = JSON.parse(localStorage.getItem('session_data') || '{}');
    storedData.addressData = formData;
    localStorage.setItem('session_data', JSON.stringify(storedData));
    console.log(localStorage.session_data)
    
    if(estado=="solicitud"){
      router.push('/telefono');}
    else if (estado=="roto"){
      router.push('/foto');
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
    console.log(municipios)
  }, [provinciaSeleccionada]);
  
  const handleProvinciaChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      provincia: e.target.value,
    });
    console.log(e.target.value)
    setProvinciaSeleccionada(e.target.value);
  };

  const handleMunicipioChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      municipio: e.target.value,
    });
    console.log(`Municipio seleccionado: ${e.target.value}`);
  };

  const update_localStorage = (address: {}) => {
    
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white">
      
      <div className=''>
        { prev_page == 'local' ?
        <div className="mt-4 input-with-float-label">
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

        <LocationFetcher /> 

        <div className="mt-6 mb-4 input-with-float-label">
          <input
            type="text"
            name="direccion"
            id="direccion"
            placeholder=" "
            //value={formData.direccion}
            onChange={handleChange}
          />
          <label htmlFor="direccion" className="block font-body_secondary text-grey04 absolute -top-3 left-2 bg-white px-1">
            Dirección
          </label>
        </div>

        <div className="mb-4 input-with-float-label">
        <select
          id="municipio"
          name="municipio"
          disabled={!provinciaSeleccionada}
          onChange={handleMunicipioChange}
          required
        >
          <option value="" disabled selected hidden>Municipio</option>
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

        <div className='mb-4 input-with-float-label'>
          <select 
            id="provincia"
            name="provincia"
            onChange={handleProvinciaChange}
            required
          >
            <option value="" disabled selected hidden></option>
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