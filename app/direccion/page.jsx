"use client"
import PageTitle from "@/app/components/PageTitle";
import { useEffect, useState } from 'react';
import '@/app/ui/globals.css'
import LocationFetcher from "../components/LocationFetcher";
import { useRouter } from "next/navigation";

const municipios = [
	"Alcalá de Guadaira", 
	"Alcalá de Henares",
	"Dos hermanas",
	"Leganés en Madrid",
	"Logroño",
	"Santander",
	"Sevilla"]

export default function EstadoContenedor() {
	const router = useRouter()

  	const [estado, setEstado] = useState('')

	const [page, setPage] = useState(0)
	const [totalPages, setTotalPage] = useState(0)
	const [direccion, setDireccion] = useState(null)
	const [isError, setIsError] = useState(false)
	const [postcode, setPostcode] = useState('')
	const [municipio, setMunicipio] = useState('')

	useEffect(() => {
		
		const storedData = JSON.parse(localStorage.getItem('session_data'));
		const _estado = storedData.estado || ''

		if (_estado == "solicitud"){
			setPage(3)
			setTotalPage(6)
		} else {
			setPage(1)
			setTotalPage(3)
		}

		setEstado(_estado)

		try{
			if(storedData.addressData) {
				setDireccion(storedData.addressData.direccion)
				setPostcode(storedData.addressData.postcode)
				setMunicipio(storedData.addressData.municipio)
			}
		} catch {

		}


	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();

		if(municipio =="" || direccion =="" || postcode ==""){
			setIsError(true)
			return
		}

		const storedData = JSON.parse(localStorage.getItem('session_data') || '{}');
		storedData.addressData = {
			direccion: direccion,
			municipio: municipio,
			postcode: postcode
		};
		storedData.address = direccion + ', ' + municipio + ', ' + postcode;

		localStorage.setItem('session_data', JSON.stringify(storedData));

		if(storedData.originalPage == 'contenedor'){
			router.push('/foto')
		} else {
			router.push('/summary')
		}
		


	}

	const localizationValue = (value) => {
		console.log(value)
		setDireccion(value.address.road)
		setPostcode(value.address.postcode)
	}

	const handleChange = (e) => {
		console.log(e)
	}

  return (
		<main className="h-screen bg-white">

			<PageTitle title={estado == 'solicitud' ? 'Solicitar cubo' : 'Contenedor ' + estado} page={page} totalPages={totalPages} />

			<div className="px-4 mt-6">
				{estado == "solicitud"? 
					<h2 className="font_h2 text-grey06 ">¿Dónde está tu establecimiento?</h2> 
					: <><h2 className="font_h2 text-grey06 ">¿Dónde está el contenedor?</h2>
				<p className="font_body text-grey06 pe-4 mt-2">Introduzca la ubicación del contenedor. Si está cerca, puede utilizar los servicios de localización.</p></>}
			</div>

			<LocationFetcher  onLocalizationValue={localizationValue}/> 
			
			<form onSubmit={handleSubmit} noValidate className="px-4 bg-white" >

				<div className={`mb-6 ${isError ? direccion ? 'input-with-float-label' : 'input-with-float-label-error' : 'input-with-float-label'}`}>
					<input
					type="text"
					name="direccion"
					id="direccion"
					placeholder=" "
					value={direccion}
					onChange={(e)=> {setDireccion(e.target.value);setIsError(false)}}
					/>
					<label htmlFor="direccion" className="block font-body_secondary text-grey04 absolute -top-3 left-2 bg-white px-1">
					Dirección
					</label>
				</div>

				<div className={`mb-6 ${isError ? municipio ? 'input-with-float-label' : 'input-with-float-label-error' : 'input-with-float-label'}`}>
					<select
					id="municipio"
					name="municipio"
					value={municipio}
					onChange={(e) => {setMunicipio(e.target.value);setIsError(false)}}
					required
					>
					<option value="" selected disabled hidden>Municipio</option>
						{municipios.map((muni, index) => (
							<option key={index} value={muni}>
							{muni}
							</option>
						))}
					</select>
					<label htmlFor="municipio" className="">
						Municipio
					</label>
				</div>

				<div className={`mb-6 ${isError ? postcode ? 'input-with-float-label' : 'input-with-float-label-error' : 'input-with-float-label'}`}>
					<input
					type="text"
					name="postcode"
					id="postcode"
					placeholder=" "
					onChange={(e) => {setPostcode(e.target.value); setIsError(false)}}
					value={postcode}
					/>
					<label htmlFor="postcode" className="block font-body_secondary text-grey04 absolute -top-3 left-2 bg-white px-1">
					Código Postal
					</label>
				</div>

				{ isError ? <p className='font_body_secondary text-error mb-6 px-5'>Rellena todos los campos
					</p> : <></>}

				<div className='fixed inset-x-0 bottom-4 mx-4'>
					<button
					type="submit"
					className="btn_primary_dark"      
					>
					Continuar
					</button>
				</div>
			</form>

		</main>

  );
}
