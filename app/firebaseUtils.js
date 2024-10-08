
import { db } from './firebaseConfig'; // Ajusta la ruta según la ubicación de tu archivo firebaseConfig.js
import { collection, addDoc } from "firebase/firestore";

const apiKey = "ccVr886c888qvhYBg3pMj3oudziHJjMtIlpJgy-wWEA"

export async function addEvent(eventData) {
    const { event_name, init_page, incidencia, actual_page } = eventData;

    try {
        // Crear el objeto de datos
        const data = {
            event_name,     // App Start, Quit, Incidencia, Success 
            init_page,      // Contenedor, Local
            incidencia,     // Contenedor roto, Contenedor lleno, Solicitar cubos
            actual_page,    // x
            apiKey,         
            timestamp: new Date().toISOString(), // Usar la fecha actual en formato ISO
        };

        // Agregar el documento a la colección 'events'
        const docRef = await addDoc(collection(db, 'events'), data);

        console.log("Event added successfully with ID: ", docRef.id);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error adding document: ", error);
        return { success: false, error: error.message };
    }
} 

export async function sendTrack(init_page, actual_page, incidencia = '') {

    const eventData = {
      event_name: "Track", // App Start, Incident, Quit, Success
      init_page: init_page,     // Contenedor, Local
      incidencia: incidencia,         // Contenedor lleno, Contenedor roto, Solicitud cubos, Whatsapp
      actual_page: actual_page,  // Cualquiera
    }

    await addEvent(eventData)

}

export async function sendSuccess(init_page, incidencia) {

    const eventData = {
      event_name: "Success", // App Start, Incident, Quit, Success
      init_page: init_page,     // Contenedor, Local
      incidencia: incidencia,         // Contenedor lleno, Contenedor roto, Solicitud cubos, Whatsapp
      actual_page: "summary",  // Cualquiera
    }

    await addEvent(eventData)

}

export async function sendBackup(init_page, incidencia, info) {

    const eventData = {
      event_name: "Backup", // App Start, Incident, Quit, Success
      init_page: init_page,     // Contenedor, Local
      incidencia: incidencia,         // Contenedor lleno, Contenedor roto, Solicitud cubos, Whatsapp
      actual_page: info  // Cualquiera
    }

    await addEvent(eventData)

}


