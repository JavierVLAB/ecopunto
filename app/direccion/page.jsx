
import AddressForm from "@/app/components/AddressForm";
import PageTitle from "@/app/components/PageTitle";
import { useEffect, useState } from 'react';
import '@/app/ui/globals.css'

export default function EstadoContenedor() {

  	const [estado, setEstado] = useState('')

	const [page, setPage] = useState(0)
	const [totalPages, setTotalPage] = useState(0)

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
	}, []);
 
  return (
		<main className="h-screen bg-white">

			<PageTitle title={estado == 'solicitud' ? 'Solicitar cubo' :'Contenedor ' + estado} page={page} totalPages={totalPages} />

			<div className="px-4 mt-6">
				{estado == "solicitud"? 
					<h2 className="font_h2 text-grey06 ">¿Dónde está tu establecimiento?</h2> 
					: <><h2 className="font_h2 text-grey06 ">¿Dónde está el contenedor?</h2>
				<p className="font_body text-grey06 pe-4 mt-2">Introduzca la ubicación del contenedor. Si está cerca, puede utilizar los servicios de localización.</p></>}
			</div>

			<AddressForm estado={estado} />
			

		</main>

  );
}
