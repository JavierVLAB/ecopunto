"use client"
import PageTitle from "@/app/components/PageTitle";
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { sendSuccess, sendBackup, sendTrack } from "../firebaseUtils";
import Image from "next/image";
import CuboCardwithSE from "../components/CuboCardwithSE";
import Link from "next/link";
import { envio_CRM, keyFilter } from "../utils";
import '@/app/ui/globals.css'

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
	const [initPage, setInitPage] = useState(null)	
	const [page, setPage] = useState(0)  

	const [isSending, setIsSending] = useState(false)

	useEffect(() => {

	  // Leer el objeto JSON desde localStorage
	  const storedData = JSON.parse(localStorage.getItem('session_data') || '{}');
	  //console.log(storedData)

	  if (storedData.originalPage == "contenedor") {
		setPage(3)
	  } else {
		setPage(7)
	  }

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
	  setIncidencia(storedData.incidencia)
	  setInitPage(storedData.originalPage)

	  const handleResize = () => {
		const vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	  };
	
	  window.addEventListener('resize', handleResize);
	  handleResize();
	
	  process.env.NODE_ENV == 'development' ? '' : sendTrack(storedData.originalPage, 'summary', storedData.incidencia)

	  return () => window.removeEventListener('resize', handleResize);
  
	  //console.log(storedData)
	}, []);

    const handleClick = async () => {

		setIsSending(true)

		const storedData = JSON.parse(localStorage.getItem('session_data') || '{}');
		//Enviar datos al CRM
		//process.env.NODE_ENV == 'development' ? '' : await envio_CRM(storedData)
		
		await envio_CRM(storedData)

		process.env.NODE_ENV == 'development' ? '' : sendSuccess(initPage, incidencia)
		const newjson = keyFilter(storedData) 
		
		process.env.NODE_ENV == 'development' ? '' : sendBackup(initPage, incidencia, JSON.stringify(newjson))
		//console.log(storedData)
		//console.log(JSON.stringify(newjson))
		setIsSending(false)
        
		router.push("/confirmacion")
	};

  return (
	<div className="min-h-screen-corrected flex flex-col justify-between bg-white items-starts">
			<div className="mt-0">
			<PageTitle title={incidencia} page={page} totalPages={page} />
			
			<div className="px-4 mt-6">
				<h2 className="font_h2 text-grey06 ">Confirme sus datos antes de enviar</h2>
			</div>

			{/*incidencia ? 
				<div className="summary">
					<p className="font_body_secondary text-grey06">Incidencia</p>
					<p className="font_body text-grey06 pt-3">{incidencia}</p>
				</div> : <></>*/}

			{direccion ? 
				<div className="summary">
					<p className="font_body_secondary text-grey06">Dirección</p>
					<p className="font_body text-grey06 pt-3">{direccion}</p>
				</div> : <></>}


			{horario ? 
				<div className="summary">
					<p className="font_body_secondary text-grey06">Horario contacto</p>
					<p className="font_body text-grey06 pt-3">{horario}</p>
				</div> : <></>}
			
			{phone ? 
				<div className="summary">
					<p className="font_body_secondary text-grey06">Telefono</p>
					<p className="font_body text-grey06 pt-3">{phone}</p>
				</div> : <></>}

			{img ? 
				<div className="summary">
					<p className="font_body_secondary text-grey06">Imagen</p>
					<Image src={img} alt="Captured" width={8} height={8} className="h-[140px] w-auto" />
				</div> : <></>}

			{solicitudData ?
				<div className="pt-6">
					<div className="flex text-grey06 px-4 pb-1">
						<p className="flex-grow font_h3">Solicitud</p>
						<p className="font_body_secondary">Cantidad</p>
					</div>
					
					{solicitudData.cubo40.quantity > 0 ?
					<CuboCardwithSE 
						size={solicitudData.cubo40.size} 
						quantity={solicitudData.cubo40.quantity} 
						sistemaElevacion={sistemaElevacion}/> : <></>
					}

					{ solicitudData.cubo40.quantity > 0 && solicitudData.cubo90.quantity > 0 || solicitudData.cubo40.quantity > 0 && solicitudData.cubo120.quantity > 0 ? <hr className="border-t border-gray-300 m-0" /> : <></>}
					
					{solicitudData.cubo90.quantity > 0 ?
					<CuboCardwithSE 
						size={solicitudData.cubo90.size} 
						quantity={solicitudData.cubo90.quantity} 
						sistemaElevacion={sistemaElevacion}/> : <></>}
					

					{ solicitudData.cubo90.quantity > 0 && solicitudData.cubo120.quantity > 0 ? <hr className="border-t border-gray-300 m-0" /> : <></>}

					{solicitudData.cubo120.quantity > 0 ?
					<CuboCardwithSE 
						size={solicitudData.cubo120.size} 
						quantity={solicitudData.cubo120.quantity} 
						sistemaElevacion={sistemaElevacion}/> : <></>}
				</div>
				: <></>
			}
			
			</div>


            <div className='p-4'>
				<p className="font_body_secondary text-grey06 mb-4">Al enviar, usted acepta nuestra <Link href={"/privacidad"} className="underline">Política de privacidad</Link></p>

                <button
                    onClick={handleClick}
                    className={`btn_primary_dark ${isSending ? 'animate-pulse' : '' }`}
                    >
                    {isSending ? "Enviando" : "Enviar"}
                </button>
            </div>

		</div>

  );
}
