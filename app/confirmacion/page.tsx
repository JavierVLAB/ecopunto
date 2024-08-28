"use client"
import Image from "next/image";
import { useEffect, useState } from "react";

import check_circle from '@/public/check-circle.svg'
import ecovidriologogreen from "@/public/EcoVidrioLogoGreen.png"
import { useRouter } from "next/navigation";

import '@/app/ui/globals.css'

const progress = 25

export default function ConfirmacionContenedor() {
	const router = useRouter()
	const [title, setTitle] = useState('')
	const [text, setText] = useState('')
	const [originalPage, setOriginalPage] = useState('')

	useEffect(() => {
		// Leer el objeto JSON desde localStorage
		const storedData = JSON.parse(localStorage.getItem('session_data') || '{}');
		setOriginalPage(storedData.originalPage)
		const incidencia = storedData.incidencia
		storedData.finish = true
		
		
		if (incidencia=='Solicitar cubo') {
			if(storedData.contactar){
				setTitle('Te llamaremos para finalizar tu solicitud.')
				setText('Gracias por su solicitud. Nos pondremos en contacto con usted lo antes posible para confirmar la solicitud.')
			} else {
				setTitle('Hemos recibido la solicitud correctamente.')
				setText('Gracias por su solicitud. Le entregaremos los cubos solicitados lo antes posible.')	
			}
		} else {
			setTitle('Gracias por informarnos sobre el contenedor.')
			setText('Enviaremos un técnico para solucionar el problema lo antes posible.')
		}

		localStorage.setItem('session_data', JSON.stringify(storedData));

		const handleResize = () => {
			const vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		  };
		
		  window.addEventListener('resize', handleResize);
		  handleResize();
		
		  return () => window.removeEventListener('resize', handleResize);
	  

	  }, []);

	  const handleClick = () => {
			
			router.push('/'+originalPage)

	  };

  return (
		<main className="min-h-screen-corrected bg-white flex flex-col justify-between">
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


			<div className=' m-4'>
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
