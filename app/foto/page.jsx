"use client"
import { useState, useRef, useEffect } from 'react';
import '@/app/ui/globals.css'
import PageTitle from "@/app/components/PageTitle";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { sendTrack } from '../firebaseUtils';

export default function Foto() {
  const router = useRouter()
  const [cameraActive, setCameraActive] = useState(false);
  const [image, setImage] = useState(null);
  const [permissionError, setPermissionError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
	const videoRef = useRef(null);
	const [showSaltar, setShowSaltar] = useState(true);
  const [estado, setEstado] = useState('')

  useEffect(() => {

    const storedData = JSON.parse(localStorage.getItem('session_data') || '{}');
		
    if(storedData.estado == 'roto'){
      setShowSaltar(false)
    }
    setEstado(storedData.estado)

    process.env.NODE_ENV == 'development' ? '' : sendTrack(storedData.originalPage, 'foto', storedData.incidencia)
     
  }, []);

  const handleUploadClick = async () => {
    setShowSaltar(false);
    setCameraActive(true);
    setPermissionError(false);
  
    try {
      // Intenta acceder a la cámara trasera
      const constraints = {
        video: {
          facingMode: { exact: "environment" } // Solicita la cámara trasera
        }
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = stream;
      videoRef.current.muted = true;  // Silenciar video para iOS
      videoRef.current.play();
    } catch (err) {
      if (err.name === "OverconstrainedError" || err.name === "ConstraintNotSatisfiedError") {
        // Si hay un error por restricciones, intenta acceder a cualquier cámara disponible
        try {
          const fallbackConstraints = {
            video: true // Esto seleccionará cualquier cámara disponible (trasera o delantera)
          };
          const stream = await navigator.mediaDevices.getUserMedia(fallbackConstraints);
          videoRef.current.srcObject = stream;
          videoRef.current.muted = true;
          videoRef.current.play();
        } catch (fallbackErr) {
          console.error("No se pudo acceder a la cámara: ", fallbackErr);
          setCameraActive(false);
          setPermissionError(true);
        }
      } else {
        console.error("Error de permisos u otro error: ", err);
        setCameraActive(false);
        setPermissionError(true);
      }
    }
  };
  

  const handleUploadClick2 = async () => {
		setShowSaltar(false)
		setCameraActive(true);
		setPermissionError(false);

    try {
      //const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      const constraints = {
        video: {
          facingMode: { exact: "environment" } // Esto intenta activar la cámara trasera
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = stream;
      //videoRef.current.muted = true;
      videoRef.current.play();
			  
    } catch (err) {
			console.log(err)
			setCameraActive(false);
      setPermissionError(true);
    }
  };

	const handleCaptureClick = () => {
		const canvas = document.createElement('canvas');
		//const video = document.querySelector("#videoElement");
    const video = videoRef.current;
		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;
		const ctx = canvas.getContext('2d');
		ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
		const imageDataUrl = canvas.toDataURL('image/png');
		setImage(imageDataUrl);
		setCameraActive(false);
		stopCamera();
	};
	
	const stopCamera = () => {
		//const video = document.querySelector("#videoElement");
    const video = videoRef.current;
		const stream = video.srcObject;
		const tracks = stream.getTracks();
		tracks.forEach(track => {
			track.stop();
		});
		video.srcObject = null;
	};

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleDeleteImage = () => {
    setImage(null);
    setModalOpen(false);
  };

	const handleClick = () => {
    const storedData = JSON.parse(localStorage.getItem('session_data') || '{}');
		storedData.image = image
	  localStorage.setItem('session_data', JSON.stringify(storedData));
		
		router.push('/summary')

	};

  return (
	<main className="h-screen bg-white">

			<PageTitle title={'Contenedor ' + estado} page={2} totalPages={3} />
			
			<div className="px-4 mt-8 mb-4">
				<h2 className="font_h2 text-grey06 ">Sube foto del estado del contenedor</h2>
				<p className="font_body text-grey06 mt-3">{showSaltar ? "Una foto nos ayuda a localizar el contenedor y resolver el incidente más rápidamente." : "Necesitamos una foto del contenedor para determinar el tipo de avería y enviar al técnico adecuado."}</p>
			</div>

      {cameraActive ? (
        <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-black">
          <video id="videoElement" ref={videoRef} className="max-w-none w-auto h-full object-cover" autoPlay playsInline muted/>
      
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
						<button
							className="relative flex items-center justify-center w-[80px] h-[80px] bg-transparent rounded-full border-2 border-ecovidrio_dark"
							onClick={handleCaptureClick}
						>
							<div className="absolute w-[68px] h-[68px] bg-ecovidrio_dark rounded-full"></div>
						</button>
					</div>
        </div>
      ) : (
        <div className="mt-2 mx-4 w-11/12 aspect-square bg-grey02 mx-auto flex items-center rounded-md">	
          {image ? (
            <div className="relative m-8">
              <Image 
                src={image} 
                alt="Captured" 
                width={8}
                height={8}
                className="w-full h-auto" />
              <button 
                className="absolute -top-4 -right-4 bg-grey04 p-1 rounded-full border border-2 border-white"
                onClick={() => setModalOpen(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
          ) : (
            <div className='w-full px-4'>
              <button 
                className="btn_primary_dark"
                onClick={handleUploadClick}
              >
                Subir Foto
              </button>
              {permissionError && (
                <p className="text-error mt-2">Necesitamos una foto del contenedor para poder procesar la incidencia</p>
              )}
            </div>
          )}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 items-center flex justify-center">
          <div className="bg-white px-4 rounded w-full mx-4">
            <p className='font_h3 text-grey06 mt-6'>¿Quieres borrar la imagen?</p>
            <button 
              className="btn_primary_dark mt-6"
              onClick={handleDeleteImage}
            >
              Borrar
            </button>
            <button 
              className="btn_secondary my-4"
              onClick={handleCloseModal}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

			{showSaltar ?
				<Link href={'/summary'}><p className="mt-3 p-4 text-center text-grey06 font_h2 underline">Saltar</p></Link>
				: <></>
			}

			{image ?
				<div className='fixed inset-x-0 bottom-4 mx-4'>
					<button
						onClick={handleClick}
						className="btn_primary_dark"
						>
						Continuar
					</button>
				</div> : <></>}
			</main>
  );
}
