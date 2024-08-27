"use client"
import Link from 'next/link'

export default function WhatsAppPie() {
    return (


        <div className="mt-[56px] pb-6">
            {/*<div className="fixed bottom-10">*/}
            <p className="font_caption text-grey05 mt-12 ms-6">¿OTRAS DUDAS?</p>
            
            <div className="px-7 mt-[12px]">
            <a  href="https://api.whatsapp.com/send?phone=+34629045150" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font_h3 text-ecovidrio_dark mt-1 underline">Escríbenos por Whatsapp</a>
            <p className="font_body_secondary text-grey05 mt-1">Horario de atención de 10-18hrs, <br/>de lunes a viernes</p>
            </div>
        </div>
    )
}