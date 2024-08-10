"use client"
import PageTitle from "@/app/components/PageTitle";
import { useEffect, useState } from 'react';

import '@/app/ui/globals.css'


export default function Summary() {

	const [sessionData, setSessionData] = useState({});

	const [user, setUser] = useState(null);

	useEffect(() => {

	  // Leer el objeto JSON desde localStorage
	  const storedData = JSON.parse(localStorage.getItem('session_data') || '{}');
	  
	  console.log(storedData)
	}, []);

    const handleClick = () => {
        router.push("/confirmacion")
	};

  return (
		<main className="h-screen bg-white">

			<PageTitle title="Resumen" page={6} totalPages={6} />

			<div className="px-4 mt-6">
				<h2 className="font_h2 text-grey06 ">Confirma la información antes de registrar el estado</h2>
				<p className="font_body text-grey06 pe-4 mt-2">Introduzca la ubicación del contenedor. Si está cerca, puede utilizar los servicios de localización.</p>
			</div>

			<div className="p-4">
				<p className="font_body_secondary text-grey06">Dirección</p>
				<p className="font_body text-grey06">mi direccion</p>
			</div>

			<div className="p-4">
				<p className="font_body_secondary text-grey06">Incidencia</p>
				<p className="font_body text-grey06">Contenedor roto</p>
			</div>

			<div className="p-4">
				<p className="font_body_secondary text-grey06">Dirección</p>
				<p className="font_body text-grey06">mi direccion</p>
			</div>


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
