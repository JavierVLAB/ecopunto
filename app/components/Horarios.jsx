import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { sendTrack } from '../firebaseUtils';

const HorarioSelector = ({onChange}) => {
  const router = useRouter()
  const [selectedHorario, setSelectedHorario] = useState(['Tarde']);
  const [selectedDias, setSelectedDias] = useState(['L', 'M', 'X', 'J', 'V']);
  const [isErrorD,setIsErrorD] = useState(false)
  const [isErrorH,setIsErrorH] = useState(false)

  const toggleDia = (dia) => {
    const newD = selectedDias.includes(dia) ? selectedDias.filter((D) => D !== dia) : [...selectedDias, dia]
    setSelectedDias(newD);

    if(newD.length === 0) {
      setIsErrorD(true)
    } else {
      setIsErrorD(false)
    }

    onChange([selectedHorario,newD])
  };

  const toggleHora = (hora) => {
    const newH = selectedHorario.includes(hora) ? selectedHorario.filter((H) => H !== hora) : [...selectedHorario, hora]
    setSelectedHorario(newH);

    if(newH.length === 0) {
      setIsErrorH(true)
    } else {
      setIsErrorH(false)
    }

    onChange([newH,selectedDias])
  };

  const handleClick = () => {

    
    if(isErrorD || isErrorH) {
      console.log("no")
      return
    }

		const storedData = JSON.parse(localStorage.getItem('session_data') || '{}');
		storedData.horario = selectedHorario.join() + ', '+ selectedDias.join()
		storedData.horarioData = [selectedHorario,selectedDias]
	  localStorage.setItem('session_data', JSON.stringify(storedData));
		//console.log(storedData)

		router.push('/summary')
	};

  useEffect(() => {
	  // Leer el objeto JSON desde localStorage
	  const storedData = JSON.parse(localStorage.getItem('session_data') || '{}');

    sendTrack(storedData.originalPage, 'horarios', storedData.incidencia)
	  
	 try{
    setSelectedDias(storedData.horarioData[1])
		setSelectHorario(storedData.horarioData[0])
	 } catch {

	 }

	}, []);

  return (
    <div className="p-4">

        <div className="flex justify-between items-center space-x-2 mt-6">
          <p className='text-grey06 font_body'>Horarios</p>
          <div className='flex'>
            <button
              className={`mx-2 px-4 py-1 rounded w-[104px] h-[50px] ${selectedHorario.includes('Mañana') ? 'bg-ecovidrio_dark text-white' : 'bg-white border text-grey06'}`}
              onClick={() => toggleHora('Mañana')}
            >
              <p className='font_h3'>Mañana</p>
              <p className='font_body_secondary'>9 - 14</p>
            </button>
            <button
              className={`mx-2 px-4 py-1 rounded  w-[104px] h-[50px] ${selectedHorario.includes('Tarde') ? 'bg-ecovidrio_dark text-white' : 'bg-white border text-grey06'}`}
              onClick={() => toggleHora('Tarde')}
            >
              <p className='font_h3'>Tarde</p>
              <p className='font_body_secondary'>14 - 18</p>
            </button>
          </div>
          
        </div>
        <p className='font_body_secondary text-error pt-3 h-6'>{isErrorH ? "Seleccione el horario en que esté disponible" : ""}</p>

        <div className=" flex justify-between items-center space-x-2 mt-12">
          <p className='flex text-grey06 font_body'>Días</p>
          <div>
            {['L', 'M', 'X', 'J', 'V'].map((dia) => (
              <button
                key={dia}
                className={`mx-1 w-10 h-10 rounded-full ${selectedDias.includes(dia) ? 'bg-ecovidrio_dark text-white' : 'bg-white text-grey06 border'}`}
                onClick={() => toggleDia(dia)}
                >
                  {dia}
              </button>
            ))}
          </div>
          
      </div>

      <p className='font_body_secondary text-error pt-3'>{isErrorD ? "Seleccione al menos un día que esté disponible":""}</p>

      <div className='fixed inset-x-0 bottom-4 mx-4'>
				<button
					onClick={handleClick}
					className="btn_primary_dark"
					>
					Continuar
				</button>
			</div>
    </div>
  );
};

export default HorarioSelector;
