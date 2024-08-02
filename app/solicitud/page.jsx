"use client"
import Image from "next/image";
import AddressForm from "@/app/components/AddressForm";
import PageTitle from "@/app/components/PageTitle";
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from "next/link";

import near_me from '@/public/near_me.svg'

import '@/app/ui/globals.css'
import CuboCard from "../components/CuboCard";


export default function Solicitud() {
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

	const handleIncrement = () => {
		setCount(count + 1);
	  };

  return (
		<main className="h-screen bg-white">

			<PageTitle title={'Solicitar Cubo'} page={1} totalPages={4} />

			<div className="px-4 mt-6 mb-8">
				<h2 className="font_h2 text-grey06 ">¿Que tamaño de cubo necesitas?</h2>
				<p className="font_body text-grey06 pe-4 mt-2">No tendras que pagar por tu cubo</p>
			</div>

			<CuboCard size = {40}/>
			<CuboCard size = {90}/>
			<CuboCard size = {120}/>
			
			<div className="px-7 mt-8">
				<p className="font_body_secundary text-grey05 mt-1 uppercase">
					¿No sabes el tamaño de que necesitas?</p>
				<Link href="/contenedor" className="link_whatsapp">Escríbenos por Whatsapp</Link>
				
			</div>

			<div className='fixed inset-x-0 bottom-4 mx-4'>
				<button
					type="submit"
					onClick={() => router.push('/sistema_elevacion')}
					className="btn_primary_dark"
				>
					Continuar
				</button>
			</div>

		</main>

  );
}
