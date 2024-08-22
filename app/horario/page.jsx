"use client"
import PageTitle from "@/app/components/PageTitle";
import { useState } from 'react';
import HorarioSelector from '@/app/components/Horarios'

import '@/app/ui/globals.css'

export default function Horarios() {
	const [horario, setHorario] = useState([['Tarde'],['L', 'M', 'X', 'J', 'V']])

	const handleClick = () => {

		const storedData = JSON.parse(localStorage.getItem('session_data') || '{}');
		storedData.horario = horario[0].join() + ', '+ horario[1].join()
		storedData.horarioData = horario
	  	localStorage.setItem('session_data', JSON.stringify(storedData));
		console.log(storedData)

		//router.push('/summary')
	};

	const handleChange = (data) => {
		setHorario(data)
	};

  return (
		<main className="h-screen bg-white ">

			<PageTitle title={'Solicitar cubo'} page={5} totalPages={6} />

			<div className="px-4 mt-6">
				<h2 className="font_h2 text-grey06 ">¿Cuándo podrá recibir la entrega de cubos?</h2>
				<p className="font_body text-grey06 mt-2">Indique sus horas disponibles e intente realizar la entrega en ese horario.</p>
			
			</div>

			<HorarioSelector onChange={handleChange}/>




		</main>

  );
}
