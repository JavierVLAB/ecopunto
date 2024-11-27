//local
"use client"
import Image from "next/image";
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import WhatsAppPie from "../components/WhatsAppPie";
import HeaderInitPage from "../components/HeaderInitPage";
import { sendTrack } from "../firebaseUtils";
import DesktopAlert from "../components/DesktopAlert";

import '../ui/globals.css'
import contenedor from "@/public/contenedor_generico.svg"
import chevron_right from "@/public/chevron_right.svg"
import cubo_generico from "@/public/cubo_generico.svg"

export default function Local() {

  const [isMobile, setIsMobile] = useState(true);    

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

    if(!storedData.finish){
		  process.env.NODE_ENV == 'development' ? '' : sendTrack('Local', 'local')
      console.log('si')
    }
    //console.log(storedData)

    const handleResize = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      
      const isMobileDevice = /Mobi/i.test(navigator.userAgent);

      if (isMobileDevice) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
		
		  window.addEventListener('resize', handleResize);
		  handleResize();
	  
		  return () => {
			window.removeEventListener('resize', handleResize);
		}

  }, []);

  const update_localStorage = (estado: string) => {
    
    const storedData = JSON.parse(localStorage.getItem('session_data') || '{}');
    
    if(estado == 'solicitud'){
      storedData.incidencia = 'Solicitar cubo'
      
    } else {
      storedData.incidencia = 'Contenedor lleno'
    }

    storedData.estado = estado
    storedData.finish = false
    localStorage.setItem('session_data', JSON.stringify(storedData));
    console.log(localStorage)
  }

  return (
      <main className="min-h-screen-corrected bg-ecovidrio_light">
        
        {!isMobile && (<DesktopAlert qr={'local'}/>)}

        <HeaderInitPage />
        
        <p className="font_caption text-grey05 mt-12 ms-6">CONTENEDOR EN LA CALLE</p>
        
        <Link 
          onClick={() => update_localStorage('lleno')}
          href={{ pathname: '/direccion'}}
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
          <p className="mx-4 font_h3 flex-grow">Solicitar cubo</p>

          <Image 
            src={chevron_right}
            height={16}
            alt="chevron right"
            className=""
          />
          
        </Link>

        <WhatsAppPie page="local"/>
      </main>

  );
}
