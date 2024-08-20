"use client"
import Link from 'next/link'

export default function WhatsAppPie() {
    return (
        <div className="fixed bottom-10">
            <p className="font_caption text-grey05 mt-12 ms-6">¿OTRAS DUDAS?</p>
            
            <div className="px-7 mt-[12px]">
            <Link href="/confirmacion" className="font_h3 text-ecovidrio_dark mt-1 underline">Escríbenos por Whatsapp</Link>
            <p className="font_body_secundary text-grey05 mt-1">Horario de atención de 10-18hrs, <br/>de lunes a viernes</p>
            </div>
        </div>
    )
}