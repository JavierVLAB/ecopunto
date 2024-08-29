"use client"

import PageTitle from "@/app/components/PageTitle";
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { sendTrack } from "../firebaseUtils";

import '@/app/ui/globals.css'

export default function EstadoContenedor() {
	const router = useRouter()
	const inputRef = useRef(null);

	const [name, setName] = useState('')

	const [isError, setIsError] = useState(false)

	useEffect(() => {
		
		const storedData = JSON.parse(localStorage.getItem('session_data') || '{}');
		console.log(storedData)

		if(storedData.nameLocal){
			//console.log('si')
			setName(storedData.nameLocal)
		} else {
			//console.log('no')
		}

		if (inputRef.current) {
			inputRef.current.focus();

			const iosFocusHack = () => {
				inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length);
			};
			setTimeout(iosFocusHack, 100);
		}

		process.env.NODE_ENV == 'development' ? '' : sendTrack(storedData.originalPage, 'nombreLocal', storedData.incidencia)		

	  }, []);

	const handleSubmit = () => {

        if(name==''){
			setIsError(true)
			return
		}

		const storedData = JSON.parse(localStorage.getItem('session_data') || '{}');

		storedData.nameLocal = name;

		localStorage.setItem('session_data', JSON.stringify(storedData));

		//console.log(localStorage)
		router.push('/direccion')
	};

	const handleChange = (event) => {
		setName(event.target.value)

		setIsError(false)

	};

  return (
		<main className="h-screen bg-white">

			<PageTitle title={'Solicitar cubo'} page={3} totalPages={6} />

			<div className="px-4 ">
				<h2 className="font_h2 text-grey06 mt-6 mb-8">¿Cuál es el nombre de su establecimiento?</h2>
			
                <div className={`mt-4 ${isError? 'input-with-float-label-error' : 'input-with-float-label'}`}>
                    <input
						ref={inputRef}
                        type="text"
                        name="local"
                        id="local"
                        placeholder=" "
                        value={name}
                        onChange={handleChange}
                        className=""
                    />
                    <label htmlFor="local" className="">
                        Nombre Establecimiento
                    </label>
                </div>
				{ isError ? <p className='font_body_secondary text-error px-5 pt-2'>Escribe un nombre
					</p> : <></>}
            
            </div>


			


			<div className='fixed inset-x-0 bottom-4 mx-4'>
				<button
					onClick={handleSubmit}
					className="btn_primary_dark"
					>
					Continuar
				</button>
			</div>


		</main>

  );
}
