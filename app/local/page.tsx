import Image from "next/image";
import Link from 'next/link'

import '../ui/globals.css'
import ecovidriologo from "@/public/EcoVidrioLogo.svg"
import curved_bg from "@/public/curved_bg.svg"
import contenedor from "@/public/contenedor_generico.svg"
import chevron_right from "@/public/chevron_right.svg"

export default function Local() {
  return (
      <main className="h-screen bg-ecovidrio_light">
        <div className="relative">
        <Image 
          src={curved_bg}
          alt="Logo ecovidrio"
          className="z-0"
        />
        </div>
        <div className="absolute inset-0 z-0 pt-14 px-4 h-10">
          <div className="flex justify-center">
            <Image 
              src={ecovidriologo}
              height={32}
              alt="Logo ecovidrio"
            />
          </div>

          <h1 className="font_h1 mt-8 text-ecovidrio_greenish">Reporte de incidencias</h1>
          <p className="font_label mt-1">Recogida de vidrio</p>

        </div>

        
        <p className="font_caption text-grey05 mt-12 ms-6">CONTENEDOR EN LA CALLE</p>
        
        <Link 
          href={"/local"}
          className="flex bg-white items-center text-grey06 mt-4 mx-4 rounded-t-lg px-4 py-3"
          >
          <Image 
            src={contenedor}
            height={34}
            alt="contenedor"
          />
          <p className="mx-4 font_h3 flex-grow">Lleno</p>

          <Image 
            src={chevron_right}
            height={16}
            alt="chevron right"
            className=""
          />
          
        </Link>

        <Link 
          href={"/local"}
          className="flex bg-white items-center text-grey06 mt-px mx-4 rounded-b-lg px-4 py-3"
          >
          <Image 
            src={contenedor}
            height={34}
            alt="contenedor"
          />
          <p className="mx-4 font_h3 flex-grow">Roto</p>

          <Image 
            src={chevron_right}
            height={16}
            alt="chevron right"
            className=""
          />
          
        </Link>

        <p className="font_caption text-grey05 mt-12 ms-6">¿OTRAS DUDAS?</p>
        
        <div className="px-7">
          <Link href="/local" className="font_h3 text-ecovidrio_dark mt-1 underline">Escríbenos por Whatsapp</Link>
          <p className="font_body_secundary text-grey05 mt-1">Horario de antención de 10-18hrs, <br/>de lunes a viernes</p>
        </div>
      </main>

  );
}
