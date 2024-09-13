"use client"
import Image from "next/image"
import ecovidriologo from "@/public/ecovidrio_logo.svg"
import curved_bg from "@/public/fondo_curved2.svg"
import '../ui/globals.css'
import { envio_CRM  } from "../utils"

export default function HeaderInitPage() {
    return (
        <div className="relative" >
        {/* <div className="relative" onClick={()=>envio_CRM()}> */}

            <div className="" >
                <Image 
                    src={curved_bg}
                    alt="fondo verde"
                    className="h-[200px]"
                />
            </div>
            {
            <div className="absolute inset-0 z-0 pt-[32px] px-4 h-10 w-full max-w-md mx-autos">
                <div className="flex">
                    <Image 
                    src={ecovidriologo}
                    width={131}
                    alt="Logo ecovidrio"
                    />
                </div>

                <h1 className="font_h1 mt-8 text-ecovidrio_greenish">Reporte de incidencias</h1>
                <p className="font_label mt-1 text-white">Recogida de vidrio</p>
            </div>}
        </div>
    )
}