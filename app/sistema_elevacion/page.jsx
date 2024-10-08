"use client"
import PageTitle from "@/app/components/PageTitle";
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import Image from "next/image";
import img_sistema_elevacion from '@/public/sistema_elevacion.png'
import '@/app/ui/globals.css'
import { sendTrack } from "../firebaseUtils";

export default function SistemaElevacion() {
	const router = useRouter() 
	const [selectedOption, setSelectedOption] = useState(null);
	const [showError, setShowError] = useState(false);

	useEffect(() => {

		const storedData = JSON.parse(localStorage.getItem('session_data') || '{}');
		console.log(storedData)

		if(storedData.sistemaElevacion){
			console.log('si')
			setSelectedOption(storedData.sistemaElevacion)
		} else {
			console.log('no')
		}

		console.log('Environment:', process.env.NODE_ENV);

		process.env.NODE_ENV == 'development' ? '' : sendTrack(storedData.originalPage, 'sistema de elevacíon', storedData.incidencia)
		
	}, []);

	const handleSubmit = () => {

        if (!selectedOption) {
            setShowError(true);
        } else {
            console.log("Opción seleccionada:", selectedOption);

			const storedData = JSON.parse(localStorage.getItem('session_data') || '{}');
			storedData.sistemaElevacion = selectedOption;
			
			if(selectedOption == 'contactame') storedData.contactar = true

			localStorage.setItem('session_data', JSON.stringify(storedData));
			
			console.log(storedData)
			router.push('/nombreLocal')
            
        }

    };

	const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
        //setError(""); // Limpiar error cuando se selecciona una opción
		setShowError(false)
    };


  return (
		<main className="h-screen bg-white">

			<PageTitle title={'Solicitar Cubo'} page={2} totalPages={7} />

			<div className="px-4 mt-6 mb-8">
				<h2 className="font_h2 text-grey06 ">¿El contenedor de la calle más cercana tiene un sistema de elevación para vaciar el cubo?</h2>
				<Image 
                    src={img_sistema_elevacion}
                    alt="contenedor"
                    className='w-full mt-4'
                />
			</div>

			<div className="">
				<div className="flex items-center px-4">
					<input id="default-radio-1" type="radio" value="si" name="default-radio" checked={selectedOption === 'si'}
						className={`radio ${showError ? 'border-error' : 'border-grey06'}`} onChange={handleRadioChange}/>
					<label for="default-radio-1" 
						className="radio_label">Si, el contenedor lo tiene</label>
				</div>

				<div className="flex items-center mt-6 px-4">
					<input id="default-radio-2" type="radio" value="no" name="default-radio" checked={selectedOption === 'no'}
						className={`radio ${showError ? 'border-error' : 'border-grey06'}`} onChange={handleRadioChange}/>
					<label for="default-radio-2" 
						className="radio_label">No</label>
				</div>

				<div className="flex items-center mt-6 px-4">
					<input id="default-radio-3" type="radio" value="contactame" name="default-radio" checked={selectedOption === 'contactame'}
						className={`radio ${showError ? 'border-error' : 'border-grey06'}`} onChange={handleRadioChange}/>
					<label for="default-radio-3" 
						className="radio_label">No lo sé, contáctame</label>
				</div>

				{showError ? 
					<div className="font_body_secondary text-error px-4 mt-4 ">Seleccione una opción para continuar</div> : <></>}

			</div>
			
			{/*<div className="px-7 mt-8">
				<p className="font_body_secundary text-grey05 mt-1 underline"
				onClick={showElevacion}>
					Como se ve el sistema de elevación</p>
				
			</div>*/}
			<div className="relative ">
				<div className='fixed inset-x-0 bottom-4 px-4 max-w-md mx-auto'>
					<button
					type="submit"
					onClick={handleSubmit}
					className="btn_primary_dark"
					>
					Continuar
					</button>
				</div>
			</div>

		</main>

  );
}
