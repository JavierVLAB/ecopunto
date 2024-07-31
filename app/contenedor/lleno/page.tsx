"use client"
import Image from "next/image";
import AddressForm from "@/app/components/AddressForm";
import PageTitle from "@/app/components/PageTitle";

import near_me from '@/public/near_me.svg'

import '@/app/ui/globals.css'


export default function ContenedorLleno() {

  return (
		<main className="h-screen bg-white">

			<PageTitle title={'Contenedor lleno'} page={1} totalPages={4} />

			<div className="px-4 mt-6">
				<h2 className="font_h2 text-grey06 ">¿Dónde está el contenedor?</h2>
				<p className="font_body text-grey06 pe-4 mt-2">Introduzca la ubicación del contenedor. Si está cerca, puede utilizar los servicios de localización.</p>
			</div>

			<div className="flex p-4 mt-6">
				<Image 
					src={near_me}
					height={16}
					alt="arrow"
					className=""
				/>
				<p className="font_body underline text-grey06 px-1">Utilizar mi localización actual</p>
			</div>

			<AddressForm></AddressForm>


		</main>

  );
}
