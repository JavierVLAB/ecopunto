"use client"
import PageTitle from "@/app/components/PageTitle";
import { useEffect, useState } from 'react';

import '@/app/ui/globals.css'


export default function Summary() {

	const [incidencia, setIncidencia] = useState(null)
	const [direccion, setDireccion] = useState(null)
	const [img, setImg] = useState(null)
	const [sistemaEleva, setSistemaEleva] = useState(null)
	const [horario, setHorario] = useState(null)
	const [phone, setPhone] = useState(null)

	useEffect(() => {

	  // Leer el objeto JSON desde localStorage
	  const storedData = JSON.parse(localStorage.getItem('session_data') || '{}');
	  
	  setIncidencia(storedData.incidencia)
	  const addressData = storedData.addressData
	  const local = addressData.local
	  const dir = addressData.direccion
	  const municipio = addressData.municipio
	  const provincia = addressData.provincia

	  const dir_prev = local + ' ' + dir + ', ' + municipio + ', ' + provincia 
	  setDireccion(dir_prev)
	  setSistemaEleva(sistemaEleva)
	  setHorario(horario)
	  setPhone(phone)


	  console.log(dir_prev)

	  //console.log(storedData)
	}, []);

    const handleClick = () => {
        router.push("/confirmacion")
	};

  return (
		<main className="h-screen bg-white">

			<PageTitle title="Resumen" page={6} totalPages={6} />

			<div className="px-4 mt-6">
				<h2 className="font_h2 text-grey06 ">Confirma la información antes de registrar el estado</h2>
				{/*<p className="font_body text-grey06 pe-4 mt-2">Introduzca la ubicación del contenedor. Si está cerca, puede utilizar los servicios de localización.</p>*/}
			</div>

			{incidencia ? 
				<div className="summary">
					<p className="font_body_secondary text-grey06">Incidencia</p>
					<p className="font_body text-grey06">{incidencia}</p>
				</div> : <></>}

			{direccion ? 
				<div className="summary">
					<p className="font_body_secondary text-grey06">Dirección</p>
					<p className="font_body text-grey06">{direccion}</p>
				</div> : <></>}

			{sistemaEleva ? 
				<div className="summary">
					<p className="font_body_secondary text-grey06">Sistema</p>
					<p className="font_body text-grey06">{sistemaEleva}</p>
				</div> : <></>}

			{horario ? 
				<div className="summary">
					<p className="font_body_secondary text-grey06">Dirección</p>
					<p className="font_body text-grey06">{}</p>
				</div> : <></>}
			
			{phone ? 
				<div className="summary">
					<p className="font_body_secondary text-grey06">Dirección</p>
					<p className="font_body text-grey06">{phone}</p>
				</div> : <></>}

			{img ? 
				<div className="summary">
					<p className="font_body_secondary text-grey06">Dirección</p>
					<p className="font_body text-grey06">{img}</p>
				</div> : <></>}



            <div className='fixed inset-x-0 bottom-4 mx-4'>
                <button
                    onClick={handleClick}
                    className="btn_primary_dark"
                    >
                    Enviar
                </button>
            </div>


		</main>

  );
}
