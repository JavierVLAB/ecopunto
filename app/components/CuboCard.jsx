import { useEffect, useState } from 'react';
import cubo_big from '@/public/cubo_big.png'
import cubo_small from '@/public/cubo_small.png'
import Image from 'next/image';

export default function CuboCard ({ size , onCounterChange }) {
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
      onCounterChange(count+1);
    }
    
    
  };

  const handleDecrement = () => {
    
    if (count > 0) {
      setCount(count - 1);
      onCounterChange(count-1); 
    }
    
  };

  return (
    <div className="flex border p-4 bg-white">
      <div className="flex-shrink-0">
      <Image 
          src={imageSrc}
          alt="Logo ecovidrio"
          className="z-0"
          height={70}
        />
      </div>
      <div className="flex-grow ml-4 text-grey06">
        <p className="font_h3">{title}</p>
        <p className='font_body_secondary'>{capacity}</p>
        <p className='font_body_secondary'>{dim}</p>
      </div>
      
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center">
            { count == 0 ? <></> : 
            
                <button id="decrement-btn"
                    onClick={handleDecrement}
                    className="buttom_increment">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                    </svg>
                </button>
            }

            { count == 0 ? <></> : <span id="counter" className="font_h2 text-grey06 mx-3">{count}</span>}
            
            <button id="increment-btn"
                onClick={handleIncrement}
                className="buttom_increment">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v12M6 12h12"></path>
                </svg>
            </button>
        </div>

      </div>
    </div>
  );
};

