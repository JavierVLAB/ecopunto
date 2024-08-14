"use client"
import PageTitle from "@/app/components/PageTitle";
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from "next/link";

import mixpanel from 'mixpanel-browser'

import '@/app/ui/globals.css'
import CuboCard from "../components/CuboCard";


export default function Solicitud() {
	const router = useRouter()

	const [cubo1, setCubo1] = useState(0)
    const [cubo2, setCubo2] = useState(0)
    const [cubo3, setCubo3] = useState(0)

	const searchParams = useSearchParams();

	useEffect(() => {
		const storedData = JSON.parse(localStorage.getItem('session_data'));
		console.log(storedData)

		mixpanel.track('Page View', {
			'page': 'Solicitud',
			'Page Name': 'Solicitud'
		  });

	}, []);

	const handleClick = () => {
		const storedData = JSON.parse(localStorage.getItem('session_data') || '{}');
	  	let solicitud = cubo1 ? cubo1 + ' cubos de 40L ' : ''
		solicitud += cubo2 ? cubo2 + ' cubos de 90L ' : ''
		solicitud += cubo3 ? cubo3 + ' cubos de 120L ' : ''
		storedData.solicitud = solicitud
		localStorage.setItem('session_data', JSON.stringify(storedData));

		router.push('/sistema_elevacion')
	};


  return (
		<main className="h-screen bg-white">

			<PageTitle title={'Solicitar Cubo'} page={1} totalPages={4} />

			<div className="px-4 mt-6 mb-8">
				<h2 className="font_h2 text-grey06 ">¿Que tamaño de cubo necesitas?</h2>
				<p className="font_body text-grey06 pe-4 mt-2">No tendras que pagar por tu cubo</p>
			</div>

			<CuboCard size = {40} onCounterChange={setCubo1}/>
			<CuboCard size = {90} onCounterChange={setCubo2}/>
			<CuboCard size = {120} onCounterChange={setCubo3}/>
			
			<div className="px-7 mt-8">
				<p className="font_body_secondary text-grey05 mt-1 uppercase">
					¿No sabes el tamaño de que necesitas?</p>
				<Link href="/contenedor" className="link_whatsapp">Escríbenos por Whatsapp</Link>
				
			</div>

			<div className='fixed inset-x-0 bottom-4 mx-4'>
				<button
					type="submit"
					onClick={handleClick}
					className="btn_primary_dark"
				>
					Continuar
				</button>
			</div>

		</main>

  );
}
