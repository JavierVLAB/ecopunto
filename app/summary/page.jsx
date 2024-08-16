"use client"
import PageTitle from "@/app/components/PageTitle";
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { send_to_CRM } from "@/app/utils"

import axios from 'axios';

import '@/app/ui/globals.css'


export default function Summary() {
	const router = useRouter()

	const [incidencia, setIncidencia] = useState(null)
	const [direccion, setDireccion] = useState(null)
	const [img, setImg] = useState(null)
	const [sistemaEleva, setSistemaEleva] = useState(null)
	const [horario, setHorario] = useState(null)
	const [phone, setPhone] = useState(null)

	useEffect(() => {

	  // Leer el objeto JSON desde localStorage
	  const storedData = JSON.parse(localStorage.getItem('session_data') || '{}');
	  console.log(storedData)
	  setIncidencia(storedData.incidencia)
	  
	  if(storedData.addressData){
		const addressData = storedData.addressData
		const local = addressData.local
		const dir = addressData.direccion
		const municipio = addressData.municipio
		const provincia = addressData.provincia
	  }
	  setDireccion(storedData.address)
	  setSistemaEleva(storedData.SistemaElevacion)
	  setPhone(storedData.phone)
	  setImg(storedData.image)
	  setHorario(storedData.horario)


	  //console.log(storedData)
	}, []);

    const handleClick = () => {
		const jsonBody = {
			"nombre": "nuevo envio",
			"apellido": "desde",
			"email": "summary.com"
		}

		try {
			//send_to_CRM(jsonBody)
		} catch (error) {
			console.error('Error al enviar los datos:', error);
		}
		
        router.push("/confirmacion")
	};

  return (
		<main className="h-screen bg-white">

			<PageTitle title="Resumen" page={6} totalPages={6} />

			<div className="px-4 mt-6">
				<h2 className="font_h2 text-grey06 ">Confirme sus datos antes de enviar</h2>
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
					<p className="font_body_secondary text-grey06">Sistema de elevación</p>
					<p className="font_body text-grey06">{sistemaEleva}</p>
				</div> : <></>}

			{horario ? 
				<div className="summary">
					<p className="font_body_secondary text-grey06">Horario contacto</p>
					<p className="font_body text-grey06">{horario}</p>
				</div> : <></>}
			
			{phone ? 
				<div className="summary">
					<p className="font_body_secondary text-grey06">Telefono</p>
					<p className="font_body text-grey06">{phone}</p>
				</div> : <></>}

			{img ? 
				<div className="summary">
					<p className="font_body_secondary text-grey06">Imagen</p>
					<img src={img} alt="Captured" className="h-[140px]" />
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
