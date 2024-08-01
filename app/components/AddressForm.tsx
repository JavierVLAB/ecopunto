import { useState, ChangeEvent, useEffect, FormEvent } from 'react';
import municipiosData from './provincias_municipios.json';
import { useRouter } from 'next/navigation'

interface FormData {
  direccion: string;
  municipio: string;
  provincia: string;
}


const formatName = (name: string) => {
  return name.toLowerCase().replace(/^\w/, c => c.toUpperCase());
};

export default function AddressForm () {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    direccion: '',
    municipio: '',
    provincia: '',
  });

    
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.name)
    console.log(e.target.value)
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);

    const storedData = JSON.parse(localStorage.getItem('session_data') || '{}');
    storedData.formData = formData;
    localStorage.setItem('session_data', JSON.stringify(storedData));

    router.push('/confirmacion');
    
  };

    const [provincias] = useState<string[]>(Object.keys(municipiosData));
    const [provinciaSeleccionada, setProvinciaSeleccionada] = useState<string>('');
    const [municipios, setMunicipios] = useState<string[]>([]);

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
      setProvinciaSeleccionada(e.target.value);
    };
  
    const handleMunicipioChange = (e: ChangeEvent<HTMLSelectElement>) => {
      // Aquí puedes manejar el cambio de municipio si es necesario
      console.log(`Municipio seleccionado: ${e.target.value}`);
    };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white">
      <div className=''>
        <div className="mb-4 relative">
          <label htmlFor="direccion" className="block font-body_secondary text-grey04 absolute -top-3 left-2 bg-white px-1">
            Dirección contenedor
          </label>
          <input
            type="text"
            name="direccion"
            id="direccion"
            value={formData.direccion}
            onChange={handleChange}
            placeholder="e.j Calle López de Hoyo"
            className="address_input"
          />
        </div>

        <div className="mb-4">
        <select
          id="municipio"
          name="municipio"
          disabled={!provinciaSeleccionada}
          placeholder='Municipio'
          onChange={handleMunicipioChange}
          className="address_input form-select appearance-none pr-8 pl-2 bg-no-repeat"
        >
          <option value="">Municipio</option>
          {municipios.map((municipio, index) => (
            <option key={index} value={municipio}>
              {municipio}
            </option>
          ))}
        </select>
        </div>

        <div className='mb-4'>
          <select 
            id="provincia"
            name="provincia"
            onChange={handleProvinciaChange}
            className="address_input form-select appearance-none pr-8 pl-2 bg-no-repeat"
          >
            <option value="">Provincia</option>
            {provincias.map((provincia, index) => (
              <option key={index} value={provincia}>
                {provincia}
              </option>
            ))}
          </select>

        </div>
      </div>

      <div className='fixed inset-x-0 bottom-4 mx-4'>
        <button
          type="submit"
          className="btn_primary_dark"
        >
          Enviar
        </button>
      </div>
    </form>
  );
};
