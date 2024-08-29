"use client"
import PageTitle from "@/app/components/PageTitle";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { sendTrack } from "../firebaseUtils";
import '@/app/ui/globals.css'
import CuboCard from "../components/CuboCard";


export default function Solicitud() {
	const router = useRouter()

	const [cubo1, setCubo1] = useState(0)
    const [cubo2, setCubo2] = useState(0)
    const [cubo3, setCubo3] = useState(0)
	const [isError, setIsError] = useState(false)
	  

	useEffect(() => {
		setIsError(false)
	}, [cubo1, cubo2, cubo3]);

	useEffect(() => {
		const storedData = JSON.parse(localStorage.getItem('session_data') || '{}');

		process.env.NODE_ENV == 'development' ? '' : sendTrack(storedData.originalPage, 'solicitud', storedData.incidencia)
		 
		
	}, []);

	const handleClick = () => {

		if(cubo1 + cubo2 + cubo3 == 0){
			setIsError(true)
			return
		}

		const storedData = JSON.parse(localStorage.getItem('session_data') || '{}');

	  	let solicitud = ''
		solicitud += cubo1 ? cubo1 + ' cubos de 40L ' : ''
		solicitud += cubo2 ? cubo2 + ' cubos de 90L ' : ''
		solicitud += cubo3 ? cubo3 + ' cubos de 120L ' : ''

		let solicitudData = {cubo40:{},cubo90:{},cubo120:{}}

		if(cubo1+cubo2+cubo3 > 3){
			storedData.contactar = true
		} else {
			storedData.contactar = false
		}

		solicitudData.cubo40.size = 40
		solicitudData.cubo40.quantity = cubo1 
		solicitudData.cubo90.size = 90
		solicitudData.cubo90.quantity = cubo2
		solicitudData.cubo120.size = 120
		solicitudData.cubo120.quantity = cubo3

		storedData.solicitud = solicitud
		storedData.solicitudData = solicitudData

		
		localStorage.setItem('session_data', JSON.stringify(storedData));

		console.log(storedData)

		if(cubo3 > 0){
			router.push('/sistema_elevacion')
		} else { 
			router.push('/nombreLocal')
		}

	};


  return (
  	<div className="min-h-screen flex flex-col justify-between bg-white">
		<div className="flex-grow pb-6">

			<PageTitle title={'Solicitar cubo'} page={1} totalPages={4} />

			<div className="px-4 mt-6 mb-8">
				<h2 className="font_h2 text-grey06 ">¿Qué tamaño de cubo necesitas?</h2>
				<p className="font_body text-grey06 pe-4 mt-2">No tendras que pagar por tu cubo</p>
			</div>
 
			<CuboCard size = {40} onCounterChange={setCubo1} qty={cubo1}/>
			<hr className="border-t border-gray-300 m-0" />
			<CuboCard size = {90} onCounterChange={setCubo2} qty={cubo2}/>
			<hr className="border-t border-gray-300 m-0" />
			<CuboCard size = {120} onCounterChange={setCubo3} qty={cubo3}/>

			{ isError ? <p className='font_body_secondary text-error px-5 pt-2'>Escoge al menos un cubo
				</p> : <></>}
			
			<div className={`px-7 ${isError ? "mt-4" : "mt-10"}`}>
				<p className="font_caption text-grey05 uppercase mb-3">
					¿No sabes que tamaño necesitas?</p>
				<a href="https://api.whatsapp.com/send?phone=+34629045150" className="link_whatsapp">Escríbenos por Whatsapp</a>
			</div>

				

		</div>

			<div className="p-4">
				<button
					type="submit"
					onClick={handleClick}
					className="btn_primary_dark "
				>
					Continuar
				</button>
				</div>
		</div>

  );
}
