"use client"

import PageTitle from "@/app/components/PageTitle";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import near_me from '@/public/near_me.svg'

import '@/app/ui/globals.css'


export default function EstadoContenedor() {
	const router = useRouter()

	const [phone, setPhone] = useState(null)

	useEffect(() => {
	}, []);

	const handleSubmit = () => {
		// Leer el objeto JSON desde localStorage
		const storedData = JSON.parse(localStorage.getItem('session_data') || '{}');

		storedData.phone = phone;

		localStorage.setItem('session_data', JSON.stringify(storedData));

		console.log(localStorage)
		router.push('/horario')
	};

	const handleChange = (event) => {
		setPhone(event.target.value)
		//console.log(event.target.value)
		
	};

  return (
		<main className="h-screen bg-white">

			<PageTitle title={'Solicitar cubo'} page={4} totalPages={6} />

			<div className="px-4 mt-6">
				<h2 className="font_h2 text-grey06 ">¿Cómo nos ponemos en contacto con usted?</h2>
			</div>

			<div className="mt-4 px-4">
				<div className="input-with-float-label">
				<input type="tel" id="phone" className="" placeholder="+34 " value={phone} onChange={handleChange}/>
					<label for="phone" className="">Número teléfono</label>
					<p className="font_body_secondary text-grey06 mt-2">Sólo nos pondremos en contacto con usted para tramitar su solicitud</p>
				</div>
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
