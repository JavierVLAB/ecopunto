"use client"

import PageTitle from "@/app/components/PageTitle";
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { sendTrack } from "../firebaseUtils";

import '@/app/ui/globals.css'


export default function EstadoContenedor() {
	const router = useRouter()
	const inputRef = useRef(null)

	const [phone, setPhone] = useState('')

	const [isError, setIsError] = useState(false)
	const [isSend, setIsSend] = useState(false)

	useEffect(() => {
		
		const storedData = JSON.parse(localStorage.getItem('session_data') || '{}');
		console.log(storedData)
		// Guardar de nuevo en localStorage
		//localStorage.setItem('session_data', JSON.stringify(storedData));
		
		if(storedData.phone){
			console.log('si')
			setPhone(storedData.phone)
		} else {
			console.log('no')
		}

		if (inputRef.current) {
			inputRef.current.focus();
		}

		if(!isSend) {
			sendTrack(storedData.originalPage, 'telefono', storedData.incidencia)
			setIsSend(true)
		} 

	  }, []);

	const handleSubmit = () => {
		// Leer el objeto JSON desde localStorage

		if(phone==''){
			setIsError(true)
			return
		}

		const phoneRegex = /^\+34 \d{9}$/;
		if (!phoneRegex.test(phone)) {
			setIsError(true);
			return
		} else {
			setIsError(false);
		}

		const storedData = JSON.parse(localStorage.getItem('session_data') || '{}');

		storedData.phone = phone;

		localStorage.setItem('session_data', JSON.stringify(storedData));

		console.log(localStorage)
		router.push('/horario')
	};

	const handleChange = (event) => {
		setPhone(event.target.value)
		//console.log(event.target.value)
		setIsError(false)

		
		
	};

	const handleFocus = () => {
		if (!phone.startsWith('+34')) {
		  setPhone('+34 ');
		}
	};

  return (
		<main className="h-screen bg-white">

			<PageTitle title={'Solicitar cubo'} page={4} totalPages={6} />

			<div className="px-4 mt-6">
				<h2 className="font_h2 text-grey06 ">¿Cómo nos ponemos en contacto con usted?</h2>
			</div>

			<div className="mt-4 px-4">
				<div className={`${isError ? "input-with-float-label-error":"input-with-float-label"}`}>
				<input ref={inputRef} type="tel" id="phone" className="" placeholder="+34 " onFocus={handleFocus} value={phone} onChange={handleChange}/>
					<label forhtml="phone" className="">Número teléfono</label>
					<p className="font_body_secondary text-grey06 mt-2">Sólo nos pondremos en contacto con usted para tramitar su solicitud</p>
				</div>
				{ isError ? <p className='font_body_secondary text-error px-5 pt-2'>Escribe un número valido (+34 XXXXXXXXX)
					</p> : <></>}
			</div>


			<div className='fixed inset-x-0 bottom-4 mx-4'>
				<button
					onClick={handleSubmit}
					className="btn_primary_dark"
					>
					Continuar
				</button>
			</div>


		</main>

  );
}
