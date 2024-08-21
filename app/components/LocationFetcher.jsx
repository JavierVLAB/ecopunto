import React, { useState } from 'react';
import Image from 'next/image';
import near_me from '@/public/near_me.svg'


export default function LocationFetcher({onGPS, onAddress, onMunicipio, onProvincia, onPostCode})  {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(false)

  const fetchLocation = (e) => {
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          fetchAddress(latitude, longitude);
          //console.log(latitude)
          //console.log(longitude)
        },
        (error) => {
          console.error('Error obtaining location', error);
          setError(true)
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const fetchAddress = async (latitude, longitude) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=es&extratags=1&countrycodes=es`
    );
    const data = await response.json();
    onGPS(true)
    setAddress(data.display_name);
    onAddress(data.display_name)
    onMunicipio(data.address.city)
    onProvincia(data.address.province || data.address.state)
    onPostCode(data.address.postcode)
    console.log(data)
  };

  return (
    <div>
      <div className={`flex mt-6 ${ error ? 'mb-1' : 'mb-8'}`}>
        <Image 
          src={near_me}
          height={16}
          
          alt="arrow"
          className="w-auto"
        />

        <button type="button" 
          onClick={fetchLocation}   
          className="font_body underline text-grey06 px-1">
            Utilizar mi localización actual
        </button>

      </div>
      { error ? <p className='font_body_secondary text-error mb-6 px-5'>Verifica los permisos de geolocalización
        </p> : <></>}
    </div>
  );
};

