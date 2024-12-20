export async function fetchingAvailablePlaces () {
  const response = await fetch('http://localhost:3000/places');
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('failed getting data');
  }
  return resData.places;
}