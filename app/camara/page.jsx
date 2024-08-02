'use client'
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [isCaptured, setIsCaptured] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [cameraError, setCameraError] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    startCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (error) {
      setCameraError('No se puede acceder a la cámara. Asegúrate de haber dado permiso y de que ningún otra aplicación esté usando la cámara.');
      console.error('Error accessing camera:', error);
    }
  };

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const imageDataUrl = canvas.toDataURL('image/png');
    setImageSrc(imageDataUrl);
    setIsCaptured(true);
  };

  const handleUpload = () => {
    router.push('/upload');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {cameraError && (
        <div className="mb-4 text-red-500">
          {cameraError}
        </div>
      )}
      <div className="relative w-full max-w-sm">
        {!isCaptured ? (
          <>
            <video ref={videoRef} className="w-full h-auto rounded-lg" playsInline autoPlay muted />
            <button
              className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white p-4 rounded-full focus:outline-none"
              onClick={capturePhoto}
            >
              Capturar
            </button>
          </>
        ) : (
          <>
            <img src={imageSrc} alt="captured" className="w-full h-auto rounded-lg" />
            <button
              className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg focus:outline-none"
              onClick={handleUpload}
            >
              Subir
            </button>
          </>
        )}
      </div>
      <canvas ref={canvasRef} className="hidden" width="640" height="480" />
    </div>
  );
}
