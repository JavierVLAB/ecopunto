"use client"
import Image from "next/image"
import QRContenedor from "@/public/QRcontenedor.svg"
import QRLocal from "@/public/QRlocal.svg"
import '../ui/globals.css'

export default function DesktopAlert({qr}) {

    return (
        <div className="absolute min-h-screen-corrected justify-center bg-grey06 mx-auto z-10 flex items-center w-full">

            <div className="text-grey03 text-center">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mx-auto" width={40}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                </svg>


                <p className="font_h1B mt-8">Esta experiencia está diseñada para móviles verticales</p>
                <p className="font_h2 mt-2">Escanee este código QR con su móvil para abrir la aplicación</p>
                
                <div className="inline-block mt-12 bg-grey01 p-4 text-center rounded-lg">
                    <Image 
                        src={qr=="contenedor" ? QRContenedor : QRLocal }
                        alt="fondo verde" 
                        className=""
                    />
                </div>
            </div>
        </div>
    )
}