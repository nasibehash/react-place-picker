import Places from './Places.jsx';
import { useEffect, useState } from 'react';
import { fetchingAvailablePlaces } from '../http.js';
import { sortPlacesByDistance } from '../loc.js';
import Error from './Error.jsx';

export default function AvailablePlaces ( {onSelectPlace} ) {
  const [ availablePlaces, setAvailablePlaces ] = useState([]);
  const [ isFetching, setIsFetching ] = useState(false);
  const [ error, setError ] = useState();

  useEffect(() => {
    async function fetchPlaces () {
      setIsFetching(true);
      try {
        const places = await fetchingAvailablePlaces();

        navigator.geolocation.getCurrentPosition(( position ) => {
          const sortedPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude);
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });
      } catch (error) {
        setError({message: error.message || 'error occured'});
        setIsFetching(false);
      }
    }

    fetchPlaces();
  }, []);

  if (error) {
    return <Error title="Error" message={error.message}/>;
  }
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      fallbackText="No places available."
      loadingText="feching places Data ..."
      onSelectPlace={onSelectPlace}
    />
  );
}
