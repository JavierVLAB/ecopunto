"use client"
import PageTitle from "@/app/components/PageTitle";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import HorarioSelector from '@/app/components/Horarios'


import '@/app/ui/globals.css'


export default function Horarios() {
	const router = useRouter()
	const [horario, setHorario] = useState([['Tarde'],['L', 'M', 'X', 'J', 'V']])

	useEffect(() => {
	  // Leer el objeto JSON desde localStorage
	  const storedData = JSON.parse(localStorage.getItem('session_data') || '{}');
	  console.log(storedData)
	  // Guardar de nuevo en localStorage
	  //localStorage.setItem('session_data', JSON.stringify(storedData));
	  
	  if(storedData.phone){
		  console.log('si')
		  
	  } else {
		  console.log('no')
	  }


	}, []);

	const handleClick = () => {
		const storedData = JSON.parse(localStorage.getItem('session_data') || '{}');
		storedData.horario = horario[0].join() + ', '+ horario[1].join()
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
				<h2 className="font_h2 text-grey06 ">¿Cuándo podrá recibir la entrega de cubos?</h2>
				<p className="font_body text-grey06 mt-2">Indique sus horas disponibles e intente realizar la entrega en ese horario.</p>
			
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
