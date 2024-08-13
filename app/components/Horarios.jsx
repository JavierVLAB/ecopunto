import { useState } from 'react';

const HorarioSelector = ({onChange}) => {
  const [selectedHorario, setSelectedHorario] = useState(['Tarde','Mañana']);
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
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Horarios</h2>
        <div className="flex items-center space-x-2 mt-2">
            <p className='text-grey06 font_body'>Horarios</p>
          <button
            className={`px-4 py-2 rounded ${selectedHorario.includes('Mañana') ? 'bg-ecovidrio_dark text-white' : 'bg-white border text-grey06'}`}
            onClick={() => toggleHora('Mañana')}
          >
            <span className='font_body'>Mañana</span>
            <br />
            <span className='font_caption'>9 - 14</span>
          </button>
          <button
            className={`px-4 py-2 rounded ${selectedHorario.includes('Tarde') ? 'bg-ecovidrio_dark text-white' : 'bg-white border text-grey06'}`}
            onClick={() => toggleHora('Tarde')}
          >
            <span className='font_body'>Tarde</span>
            <br />
            <span className='font_body_caption'>14 - 18</span>
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold">Días</h2>
        <div className="flex items-center space-x-2 mt-2">
            <p className='text-grey06 font_body'>Días</p>

            {['L', 'M', 'X', 'J', 'V'].map((dia) => (
                <button
                key={dia}
                className={`w-10 h-10 rounded-full ${selectedDias.includes(dia) ? 'bg-ecovidrio_dark text-white' : 'bg-white text-grey06 border'}`}
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
