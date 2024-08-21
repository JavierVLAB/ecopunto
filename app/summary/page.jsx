"use client"
import PageTitle from "@/app/components/PageTitle";
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { send_to_CRM } from "@/app/utils"
import Image from "next/image";
import CuboCardwithSE from "../components/CuboCardwithSE";

import '@/app/ui/globals.css'
import CuboCard from "../components/CuboCard";


export default function Summary() {
	const router = useRouter()

	const [incidencia, setIncidencia] = useState(null)
	const [direccion, setDireccion] = useState(null)
	const [img, setImg] = useState(null)
	const [horario, setHorario] = useState(null)
	const [phone, setPhone] = useState(null)
	const [solicitud, setSolicitud] = useState(null)
	const [solicitudData, setSolicitudData] = useState(null)
	const [sistemaElevacion, setSistemaElevacion] = useState(null)

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
	  setSolicitudData(storedData.solicitudData)
	  setPhone(storedData.phone)
	  setImg(storedData.image)
	  setHorario(storedData.horario)
	  setSistemaElevacion(storedData.sistemaElevacion == 'si')

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

			<PageTitle title={incidencia} page={6} totalPages={6} />

			<div className="px-4 mt-6">
				<h2 className="font_h2 text-grey06 ">Confirme sus datos antes de enviar</h2>
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
					<Image src={img} alt="Captured" width={8} height={8} className="h-[140px] w-auto" />
				</div> : <></>}

			{solicitudData ?
				<div className="pt-3">
					<div className="flex text-grey06 px-4 pb-1">
						<p className="flex-grow font_h3">Solicitud</p>
						<p className="font_body_secondary">Cantidad</p>
					</div>
					
					{solicitudData.cubo40.quantity > 0 ?
					<CuboCardwithSE 
						size={solicitudData.cubo40.size} 
						quantity={solicitudData.cubo40.quantity} 
						sistemaElevacion={sistemaElevacion}/> : <></>}
					{solicitudData.cubo90.quantity > 0 ?
					<CuboCardwithSE 
						size={solicitudData.cubo90.size} 
						quantity={solicitudData.cubo90.quantity} 
						sistemaElevacion={sistemaElevacion}/> : <></>}
					{solicitudData.cubo120.quantity > 0 ?
					<CuboCardwithSE 
						size={solicitudData.cubo120.size} 
						quantity={solicitudData.cubo120.quantity} 
						sistemaElevacion={sistemaElevacion}/> : <></>}
				</div>
				: <></>
			}



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
