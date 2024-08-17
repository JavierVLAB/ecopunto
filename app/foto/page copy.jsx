"use client"

import PageTitle from "@/app/components/PageTitle";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';


import '@/app/ui/globals.css'


export default function EstadoContenedor() {

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

			<PageTitle title={'Contenedor roto'} page={2} totalPages={4} />

			<div className="px-4 mt-6">
				<h2 className="font_h2 text-grey06 ">Sube foto del estado del contenedor</h2>
				<p className="font_body_secondary text-grey06 mt-2">Necesitamos una foto del contenedor para determinar el tipo de avería y enviar al técnico adecuado.</p>
			
			</div>

			<div className="mt-2 mx-4 w-11/12 h-auto aspect-square bg-grey01 mx-auto flex items-center rounded-md">
				<button
					onClick={handleClick}
					className="btn_secondary"
					>
					Subir Foto
				</button>
			</div>

			{/*<div className='fixed inset-x-0 bottom-4 mx-4'>
				<button
					onClick={handleClick}
					className="btn_primary_dark"
					>
					Continuar
				</button>
			</div>*/}

			<p className="mt-3 p-4 text-center text-grey06 font_h2 underline">Saltar</p>


		</main>

  );
}
