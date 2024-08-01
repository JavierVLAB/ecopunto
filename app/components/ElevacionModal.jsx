import React from 'react';
import Image from "next/image";
import { useState } from 'react';
import img_sistema_elevacion from '@/public/sistema_elevacion.png'

export default function ElevacionModal ({ isOpen, closeModal }) {
  
  if (!isOpen) return null;

  const [cerrarModal, setCerrarModal] = useState(false);

  return (
    <div className="fixed inset-0 flex items-end justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50" onClick={closeModal}></div>
          <div className="bg-white rounded-t-lg overflow-hidden shadow-lg w-full max-w-md z-50 transform transition-transform duration-300 ease-in-out translate-y-full"
               style={{ transform: isOpen ? 'translateY(0)' : 'translateY(100%)' }}>
           
            <div className="">
                <div className="flex justify-between items-center p-2">
                    <div className="flex-grow text-center ms-12">
                        <span className="text-grey06 font_h2">Sistema Elevación</span>
                    </div>
                    <button onClick={closeModal} className="text-[24px] text-grey06 hover:text-gray-700 px-4">
                        ×
                    </button>
                </div>
                <Image 
                    src={img_sistema_elevacion}
                    alt="contenedor"
                    className='w-full'
                />
                <p className="text-grey06 font_body px-4 py-8">Los contenedores con sistema de elevación tienen un accesorio cerca de la abertura del contenedor para ayudar a levantar y vaciar el contenedor.</p>
            </div>
          </div>
        </div>
  );
};
