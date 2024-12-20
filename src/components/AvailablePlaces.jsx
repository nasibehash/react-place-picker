import Places from './Places.jsx';
import { fetchingAvailablePlaces } from '../http.js';
import { sortPlacesByDistance } from '../loc.js';
import Error from './Error.jsx';
import { useFetch } from '../hooks/useFetch.js';

async function fetchSortedPlaces () {
  const places = await fetchingAvailablePlaces();

  return new Promise(( resolve ) => {
    navigator.geolocation.getCurrentPosition(( position ) => {
      const sortedPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude);
      resolve(sortedPlaces);
    });
  });
}

export default function AvailablePlaces ( {onSelectPlace} ) {

  const {
    isFetching,
    error,
    fetchedData: availablePlaces
  } = useFetch(fetchSortedPlaces, []);

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
