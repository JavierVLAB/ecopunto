"use client"
import Image from "next/image";
import AddressForm from "@/app/components/AddressForm";
import PageTitle from "@/app/components/PageTitle";
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import near_me from '@/public/near_me.svg'

import '@/app/ui/globals.css'


export default function EstadoContenedor() {
	const router = useRouter()

	const searchParams = useSearchParams();
  	const estado = searchParams.get('estado'); 
	console.log(estado)
	const [sessionData, setSessionData] = useState({});

	const [user, setUser] = useState(null);

	useEffect(() => {
	  // Leer el objeto JSON desde localStorage
	  const storedData = JSON.parse(localStorage.getItem('session_data') || '{}');
	  
	  // Actualizar el objeto JSON con nuevos datos
	  storedData.lastPage = 'estado_contenedor';
	  storedData.estadoContenedor = estado;
	  storedData.incidencia = 'contenedor ' + estado
  
	  // Guardar de nuevo en localStorage
	  localStorage.setItem('session_data', JSON.stringify(storedData));
	  
	  // Actualizar el estado local
	  setSessionData(storedData);
	  console.log(storedData)
	}, []);

	const handleClick = () => {

	};

	const handleChange = () => {

	};

  return (
		<main className="h-screen bg-white">

			<PageTitle title={'Solicitar cubo'} page={3} totalPages={5} />

			<div className="px-4 mt-6">
				<h2 className="font_h2 text-grey06 ">¿Cómo nos ponemos en contacto con usted?</h2>
			</div>

			<div class="mt-8 p-4">
				<label for="floating_outlined" class="block font-body_secondary text-grey04 -top-5 left-2 bg-white px-1">Número teléfono</label>
				<input type="text" id="floating_outlined" class="address_input" placeholder=" " />
				<p className="font_body_secondary text-grey06 mt-2">Sólo nos pondremos en contacto con usted para tramitar su solicitud</p>
			</div>

			<div className='fixed inset-x-0 bottom-4 mx-4'>
				<button
					onClick={() => router.push('/horario')}
					className="btn_primary_dark"
					>
					Continuar
				</button>
			</div>


		</main>

  );
}
