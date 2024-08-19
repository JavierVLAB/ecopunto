import { useEffect, useState } from 'react';
import cubo_big from '@/public/cubo_big.png'
import cubo_small from '@/public/cubo_small.png'
import Image from 'next/image';

export default function CuboCard ({ size, quantity, sistemaElevacion}) {
    const [count, setCount] = useState(0);
    const [title, setTitle] = useState('')
    const [imageSrc, setImageSrc ] = useState(cubo_big)
    const [dim, setDim ] = useState('')
    const [capacity, setCapacity] = useState('')


    useEffect(() => {
        
        if (size == 40) {
            setImageSrc(cubo_small)
            setTitle('Cubo 40L')
            setDim('445 X 365 X 420 mm')
            setCapacity('14 botellines')
        } else if (size == 90) {
            setImageSrc(cubo_big)
            setTitle('Cubo 90L')
            setDim('825 X 485 X 545 mm')
            setCapacity('40 botellines')
        } else if (size == 120){
            setImageSrc(cubo_big)
            setTitle('Cubo 120L')
            setDim('980 X 485 X 550 mm')
            setCapacity('54 botellines')
        }

    }, [])
  
    

  const handleIncrement = () => {
    
    if (count < 5) {
      setCount(count + 1); 
    }
    
    
  };

  const handleDecrement = () => {
    
    if (count > 0) {
      setCount(count - 1);
    }
    
  };

  return (
    <div className="flex border py-4 px-8 bg-white text-grey06 font_h3">
      <div className="flex-shrink-0">
      <Image 
          src={imageSrc}
          alt="Logo ecovidrio"
          className="z-0"
          
          style={{ height:50, width: 'auto' }}
        />
      </div>

      <div className="flex m-2 text-grey06 justify-center items-center">
        <p className="font_h3 flex item-center">{title}</p>
      </div>

      <div className="flex m-2 items-center justify-center">
        <p className={`${sistemaElevacion? 'text-grey06 bg-ecovidrio_light': 'text-white'} font_h3 py-1 px-2 rounded-md`}>Sist. Elevación</p>
      </div>


      
      <div className="flex flex-end items-center justify-center ps-2">
        <p className='text-grey06'>{quantity}</p>
      </div>
    </div>
  );
};

