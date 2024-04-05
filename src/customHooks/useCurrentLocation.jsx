import React, { useState, useEffect } from "react";

// Definizione del custom hook useCurrentLocation
export function useCurrentLocation() {
  // Definizione dello state per la posizione corrente, il caricamento e gli eventuali errori
  const [location, setLocation] = useState(null); // State per la posizione corrente
  const [loading, setLoading] = useState(false); // State per il caricamento
  const [error, setError] = useState(null); // State per gli errori

  // Funzione per ottenere la posizione corrente
  function getLocation() {
    // Imposta lo state del caricamento su true e resetta eventuali errori
    setLoading(true);
    setError(null);

    // Ottiene la posizione corrente utilizzando l'API del geolocalizzatore del browser
    // e imposta lo state della posizione corrente, del caricamento e degli errori
    navigator.geolocation.getCurrentPosition(
      // Callback di successo: la posizione corrente è stata ottenuta con successo
      (position) => {
        setLocation(position.coords); // Imposta la posizione corrente
        setLoading(false); // Imposta lo stato del caricamento su false
      },
      // Callback di errore: si è verificato un errore durante il recupero della posizione corrente
      (error) => {
        setError(error); // Imposta l'errore
        setLoading(false); // Imposta lo stato del caricamento su false
      }
    );
  }

  // Utilizza useEffect per chiamare la funzione getLocation quando il componente viene montato
  // in modo da ottenere la posizione corrente subito dopo il rendering iniziale del componente
  useEffect(() => {
    getLocation();
  }, []);

  // Return del contenuto del custom Hook
  return [location, getLocation, loading, error];
}
