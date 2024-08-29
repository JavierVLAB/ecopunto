import { useEffect } from 'react';

function quitFunction(function_) {

    useEffect(() => {

      const handleBeforeUnload = (event) => {

        function_()
        const message = "¿Estás seguro de que quieres salir?";
        event.preventDefault();
        event.returnValue = message;
        return message;
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }, []);
  }

export default quitFunction;
