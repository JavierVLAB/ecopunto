import { useState } from 'react';

const HorarioSelector = ({onChange}) => {
  const [selectedHorario, setSelectedHorario] = useState(['Tarde']);
  const [selectedDias, setSelectedDias] = useState(['L', 'M', 'X', 'J', 'V']);

  const toggleDia = (dia) => {
    const newD = selectedDias.includes(dia) ? selectedDias.filter((D) => D !== dia) : [...selectedDias, dia]
    setSelectedDias(newD);

    onChange([selectedHorario,newD])
  };

  const toggleHora = (hora) => {
    const newH = selectedHorario.includes(hora) ? selectedHorario.filter((H) => H !== hora) : [...selectedHorario, hora]
    setSelectedHorario(newH);

    onChange([newH,selectedDias])
  };

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
    </div>
  );
};

export default HorarioSelector;
