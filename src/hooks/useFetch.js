import { useEffect, useState } from 'react';

export function useFetch ( fetchFn, initialValue ) {
  const [ fetchedData, setFetchedData ] = useState(initialValue);

  const [ isFetching, setIsFetching ] = useState(false);

  const [ error, setError ] = useState();

  useEffect(() => {
    async function fetchData () {
      setIsFetching(true);
      try {
        const places = await fetchFn();
        setFetchedData(places);
      } catch (error) {
        setError({message: error.message || 'failed fetching data'});
      }
      setIsFetching(false);
    }

    fetchData();
  }, [ fetchFn ]);

  return {
    isFetching,
    error,
    fetchedData,
    setFetchedData
  };
}