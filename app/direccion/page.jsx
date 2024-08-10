"use client"
import Image from "next/image";
import AddressForm from "@/app/components/AddressForm";
import PageTitle from "@/app/components/PageTitle";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import '@/app/ui/globals.css'
import Solicitud from "../solicitud/page";


export default function EstadoContenedor() {

	const searchParams = useSearchParams();
  	const estado = searchParams.get('estado'); 
	const prev_page = searchParams.get('prev');
	console.log(estado)
	console.log(prev_page)
	const [sessionData, setSessionData] = useState({});
	const [page, setPage] = useState(0)
	const [totalPages, setTotalPage] = useState(0)

	const [user, setUser] = useState(null);

	useEffect(() => {

		if (estado == "solicitud"){
			setPage(3)
			setTotalPage(6)
		} else {
			setPage(1)
			setTotalPage(3)
		}

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
 
  return (
		<main className="h-screen bg-white">

			<PageTitle title={estado == 'solicitud' ? 'Solicitar cubo' :'Contenedor ' + estado} page={page} totalPages={totalPages} />

			<div className="px-4 mt-6">
				{estado == "solicitud"? 
					<h2 className="font_h2 text-grey06 ">¿Dónde está tu establecimiento?</h2> 
					: <><h2 className="font_h2 text-grey06 ">¿Dónde está el contenedor?</h2>
				<p className="font_body text-grey06 pe-4 mt-2">Introduzca la ubicación del contenedor. Si está cerca, puede utilizar los servicios de localización.</p></>}
			</div>

			<AddressForm estado={estado} prev_page={prev_page} />
			

		</main>

  );
}
