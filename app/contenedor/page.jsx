//contenedor
"use client"
import Image from "next/image";
import WhatsAppPie from "../components/WhatsAppPie";
import HeaderInitPage from "../components/HeaderInitPage";


import { useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import Link from "next/link";

import '../ui/globals.css'
import contenedor from "@/public/contenedor_generico.svg"
import chevron_right from "@/public/chevron_right.svg"
import { addEvent } from "@/app/firebaseUtils"

export default function Contenedor() {
  
  const router = useRouter();

  const sendEventData = async (incidencia) => {

    const eventData = {
        event_name: "App Start", // App Start, Incident, Quit, Success
        init_page: "Contenedor",     // Contenedor, Local
        incidencia: incidencia,         // Contenedor lleno, Contenedor roto, Solicitud cubos, Whatsapp
        actual_page: "Contenedor",  // Cualquiera
    };

    await addEvent(eventData);

  };

  useEffect(() => {
    localStorage.removeItem('session_data');

    let storedId = localStorage.getItem('session_id');
    if (!storedId) {
      storedId = uuidv4();
      localStorage.setItem('session_id', storedId);
    } 

    // Cargar o inicializar el objeto JSON
    const storedData = JSON.parse(localStorage.getItem('session_data') || '{}');
    storedData.sessionId = storedId;
    storedData.timestamp = new Date().toISOString();
    storedData.originalPage = 'contenedor';

    // Guardar el objeto JSON en localStorage
    localStorage.setItem('session_data', JSON.stringify(storedData));

  }, []);

  const handleClick = (estado_contenedor) => {
    const storedData = JSON.parse(localStorage.getItem('session_data') || '{}');
    storedData.incidencia = "Contenedor " + estado_contenedor;
    storedData.estado = estado_contenedor
    localStorage.setItem('session_data', JSON.stringify(storedData));

    const query = {
      estado: estado_contenedor
    }

    sendEventData(storedData.incidencia)

  }

  return (
      <main className="min-h-screen bg-ecovidrio_light">

        <HeaderInitPage />

        <p className="font_caption text-grey05 mt-12 ms-6">CONTENEDOR EN LA CALLE</p>
        
        <Link
          onClick={() => handleClick('lleno')}
          href={"/direccion"}
          className="init-white-buttom rounded-t-lg mt-4"
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
          onClick={() => handleClick('roto')}
          href={"/direccion"}
          className="init-white-buttom rounded-b-lg mt-[2px]"
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

        <WhatsAppPie />
      </main>

  );
}
