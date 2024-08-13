"use client"
import PageTitle from "@/app/components/PageTitle";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import HorarioSelector from '@/app/components/Horarios'


import '@/app/ui/globals.css'


export default function EstadoContenedor() {
	const router = useRouter()
	const [horario, setHorario] = useState([['Tarde', 'Mañana'],['L', 'M', 'X', 'J', 'V']])

	useEffect(() => {
	  // Leer el objeto JSON desde localStorage
	  const storedData = JSON.parse(localStorage.getItem('session_data') || '{}');
	  
	  // Guardar de nuevo en localStorage
	  localStorage.setItem('session_data', JSON.stringify(storedData));

	}, []);

	const handleClick = () => {
		const storedData = JSON.parse(localStorage.getItem('session_data') || '{}');
		storedData.horario = horario
	  	localStorage.setItem('session_data', JSON.stringify(storedData));
		//console.log(storedData)
		router.push('/summary')
	};

	const handleChange = (data) => {
		setHorario(data)
	};

  return (
		<main className="h-screen bg-white ">

			<PageTitle title={'Solicitar cubo'} page={5} totalPages={6} />

			<div className="px-4 mt-6">
				<h2 className="font_h2 text-grey06 ">¿Cuándo debemos ponernos en contacto con usted? (Opcional) </h2>
				<p className="font_body_secondary text-grey06 mt-2">Indique cuándo tiene disponibilidad para recibir entregas en su establecimiento.</p>
			
			</div>

			

			<HorarioSelector onChange={handleChange}/>


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
