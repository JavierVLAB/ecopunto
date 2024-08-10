"use client"
import PageTitle from "@/app/components/PageTitle";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from "next/navigation";
import Image from "next/image";
import img_sistema_elevacion from '@/public/sistema_elevacion.png'


import '@/app/ui/globals.css'



export default function SistemaElevacion() {
	const router = useRouter() 

	const [showElevacionModal, setShowElevacionModal] = useState(false)
  

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

	const showElevacion = () => {
		setShowElevacionModal(true)
	  };

	

  return (
		<main className="h-screen bg-white">

			<PageTitle title={'Solicitar Cubo'} page={2} totalPages={6} />

			<div className="px-4 mt-6 mb-8">
				<h2 className="font_h2 text-grey06 ">¿Tu contenedor de la calle más cercana tiene una sistema de elevación para vaciar el cubo?</h2>
				<Image 
                    src={img_sistema_elevacion}
                    alt="contenedor"
                    className='w-full mt-4'
                />
			</div>

			<div className="">
				<div className="flex items-center px-4">
					<input id="default-radio-1" type="radio" value="" name="default-radio" 
						class="radio"/>
					<label for="default-radio-1" 
						class="radio_label">Si, el contenedor lo tiene</label>
				</div>

				<div className="flex items-center mt-8 px-4">
					<input id="default-radio-2" type="radio" value="" name="default-radio" 
						class="radio"/>
					<label for="default-radio-2" 
						class="radio_label">No</label>
				</div>


			</div>
			
			{/*<div className="px-7 mt-8">
				<p className="font_body_secundary text-grey05 mt-1 underline"
				onClick={showElevacion}>
					Como se ve el sistema de elevación</p>
				
			</div>*/}

			<div className='fixed inset-x-0 bottom-4 mx-4'>
				<button
				type="submit"
				onClick={() => router.push('/direccion?estado=solicitud&prev=s.elevation')}
				className="btn_primary_dark"
				>
				Continuar
				</button>
			</div>

		</main>

  );
}
