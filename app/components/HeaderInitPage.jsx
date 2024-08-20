"use client"
import Image from "next/image"
import ecovidriologo from "@/public/EcoVidrioLogo.svg"
import curved_bg from "@/public/curved_bg.svg"
import curved_bg2 from "@/public/curved_bg2.svg"
import '../ui/globals.css'

export default function HeaderInitPage() {
    return (
        <div>
            <div className="relative" >
                <Image 
                    src={curved_bg}
                    alt="Logo ecovidrio"
                    height={232}
                    className="z-0 w-full"
                    
                />
            </div>
            {/*
            <div className="absolute inset-0 z-0 pt-14 px-4 h-10">
                <div className="flex justify-center">
                    <Image 
                    src={ecovidriologo}
                    height={32}
                    alt="Logo ecovidrio"
                    />
                </div>

                <h1 className="font_h1 mt-8 text-ecovidrio_greenish">Reporte de incidencias</h1>
                <p className="font_label mt-1 text-white">Recogida de vidrio</p>
            </div>*/}
        </div>
    )
}