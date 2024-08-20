//local
"use client"
import Image from "next/image";
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import WhatsAppPie from "../components/WhatsAppPie";
import HeaderInitPage from "../components/HeaderInitPage";


import '../ui/globals.css'
import contenedor from "@/public/contenedor_generico.svg"
import chevron_right from "@/public/chevron_right.svg"
import cubo_generico from "@/public/cubo_generico.svg"

export default function Local() {

  const router = useRouter();

  useEffect(() => {
    // Generar un nuevo ID y construir el JSON inicial
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
    storedData.originalPage = 'local';

    // Guardar el objeto JSON en localStorage
    localStorage.setItem('session_data', JSON.stringify(storedData));

    console.log(storedData)

  }, []);

  const update_localStorage = (estado: string) => {
    
    const storedData = JSON.parse(localStorage.getItem('session_data') || '{}');
    
    if(estado == 'solicitud'){
      storedData.incidencia = 'Solicitud de cubos'
    } else {
      storedData.incidencia = 'Contenedor lleno'
    }

    storedData.estado = estado

    localStorage.setItem('session_data', JSON.stringify(storedData));
    console.log(localStorage)
  }


  return (
      <main className="h-screen bg-ecovidrio_light">
        
        <HeaderInitPage />
        
        <p className="font_caption text-grey05 mt-12 ms-6">CONTENEDOR EN LA CALLE</p>
        
        <Link 
          onClick={() => update_localStorage('lleno')}
          href={{ pathname: '/direccion', query:{ estado: 'lleno'} }}
          className="init-white-buttom rounded mt-4"
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

        <p className="font_caption text-grey05 mt-12 ms-6">CUBO EN TU ESTABLECIMIENTO</p>
        
        <Link 
          onClick={() => update_localStorage('solicitud')}
          href={"/solicitud"}
          className="init-white-buttom rounded mt-4"
          >
          <Image 
            src={cubo_generico}
            height={34}
            alt="contenedor"
          />
          <p className="mx-4 font_h3 flex-grow">Solicitar Cubo</p>

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
