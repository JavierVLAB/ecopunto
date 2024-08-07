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
        router.push("/confirmacion")
	};

  return (
		<main className="h-screen bg-white">

			<PageTitle title={estado == 'solicitud' ? 'Solicitar cubo' :'Contenedor '} page={4} totalPages={4} />

			<div className="px-4 mt-6">
				{estado == "solicitud" ? 
					<h2 className="font_h2 text-grey06 ">¿Dónde está tu establecimiento?</h2> 
					: <><h2 className="font_h2 text-grey06 ">¿Dónde está el contenedor?</h2>
				<p className="font_body text-grey06 pe-4 mt-2">Introduzca la ubicación del contenedor. Si está cerca, puede utilizar los servicios de localización.</p></>}
			</div>

            <div className='fixed inset-x-0 bottom-4 mx-4'>
                <button
                    onClick={handleClick}
                    className="btn_primary_dark"
                    >
                    Continuar
                </button>
            </div>


		</main>

  );
}
