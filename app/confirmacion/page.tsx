"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import mixpanel from "mixpanel-browser";

import check_circle from '@/public/check-circle.svg'
import ecovidriologogreen from "@/public/EcoVidrioLogoGreen.png"

import '@/app/ui/globals.css'

const progress = 25

export default function ConfirmacionContenedor() {
	const [sessionData, setSessionData] = useState({});
	const [estado, setEstado] = useState('')
	const [sistemaElevancion, setSistemaElevacion] = useState('')
	const [title, setTitle] = useState('')
	const [text, setText] = useState('')

	useEffect(() => {
		// Leer el objeto JSON desde localStorage
		const storedData = JSON.parse(localStorage.getItem('session_data') || '{}');
	
		// Actualizar el estado local
		setSessionData(storedData);

		console.log(storedData)
		setEstado(storedData.estado)
		
		if (estado=='solicitud') {
			setTitle('')
		} else {
			setTitle('Gracias por informarnos sobre el contenedor ' + estado + '.')
			setText('Enviaremos un técnico para solucionar el problema lo antes posible.')
		}

		mixpanel.track('Page View', {
			'page': 'Confirmacion',
			'Page Name': 'Confirmacion'
		  });

	  }, []);

	  const handleClick = () => {
			console.log('cerrado')
			window.close();

	  };

  return (
		<main className="h-screen bg-white flex flex-col justify-between">
			<div className="flex justify-center mt-6">
				<Image 
					src={ecovidriologogreen}
					height={30}
					alt="arrow"
					className=""
				/>
			</div>

			<div className="flex flex-1 items-center justify-center">
				<div className="p-4 items-center">
					<Image 
						src={check_circle}
						height={40}
						alt="arrow"
						className=""
					/>
					<h2 className="font_h2 text-grey06 mt-8">{title}</h2>
					<p className="font_body text-grey06 mt-2">{text}</p>
				</div>
			</div>


			<div className='m-4'>
				<button
					onClick={handleClick}
					className="btn_primary_dark"
					>
					Cerrar
				</button>
			</div>

		</main>

  );
}
