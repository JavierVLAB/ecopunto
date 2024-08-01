"use client"
import Image from "next/image";
import { useEffect, useState } from "react";

import check_circle from '@/public/check-circle.svg'
import ecovidriologo from "@/public/EcoVidrioLogo.svg"

import '@/app/ui/globals.css'

const progress = 25

export default function ConfirmacionContenedor() {
	const [sessionData, setSessionData] = useState({});

	useEffect(() => {
		// Leer el objeto JSON desde localStorage
		const storedData = JSON.parse(localStorage.getItem('session_data') || '{}');
	
		// Actualizar el objeto JSON con nuevos datos
		storedData.lastPage = 'confirmacion';

		
		// Actualizar el estado local
		setSessionData(storedData);

		console.log(storedData)
	  }, []);

  return (
		<main className="h-screen bg-white pt-28">

				<Image 
					src={ecovidriologo}
					height={40}
					alt="arrow"
					className=""
				/>
			

			<div className="p-4">
				<Image 
					src={check_circle}
					height={40}
					alt="arrow"
					className=""
				/>
				<h2 className="font_h2 text-grey06 mt-8">Hemos recibido solicitud de cubos</h2>
				<p className="font_body text-grey06 mt-2">Gracias por enviar su solicitud. <br/> Un representante de Ecovidrio se pondrá en contacto con usted en breve.</p>
			</div>


			<div className="px-4">
				<button className="btn_primary_dark">
					Cerrar
				</button>
			</div>

		</main>

  );
}
