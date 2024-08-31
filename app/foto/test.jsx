
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
  const videoRef = useRef(null);
  const [showSaltar, setShowSaltar] = useState(true);
  const [estado, setEstado] = useState('')

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('session_data') || '{}');
    if (storedData.estado === 'roto') {
      setShowSaltar(false)
    }
    setEstado(storedData.estado)
    process.env.NODE_ENV !== 'development' && sendTrack(storedData.originalPage, 'foto', storedData.incidencia)
  }, []);

  const handleUploadClick = async () => {
    setShowSaltar(false)
    setCameraActive(true);
    setPermissionError(false);

    try {
      const constraints = {
        video: {
          facingMode: { exact: "environment" } // Intenta activar la cámara trasera
        }
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = stream;
      videoRef.current.muted = true;  // Silenciar video para iOS
      videoRef.current.play();
    } catch (err) {
      console.log(err)
      setCameraActive(false);
      setPermissionError(true);
    }
  };

  const handleCaptureClick = () => {
    const canvas = document.createElement('canvas');
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageDataUrl = canvas.toDataURL('image/png');
    setImage(imageDataUrl);
  };

  return (
    <div>
      <PageTitle title="Captura de Foto" />
      <div>
        {cameraActive ? (
          <video ref={videoRef} id="videoElement" autoPlay playsInline muted />
        ) : (
          <button onClick={handleUploadClick}>Activar Cámara</button>
        )}
        {image && <Image src={image} alt="Captura" width={300} height={300} />}
        {cameraActive && <button onClick={handleCaptureClick}>Capturar</button>}
        {permissionError && <p>Error de permisos. No se puede acceder a la cámara.</p>}
      </div>
    </div>
  );
}
