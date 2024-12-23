export async function fetchingAvailablePlaces () {
  const response = await fetch('http://localhost:3000/places');
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('failed getting data');
  }
  return resData.places;
}

export async function UpdateUserPlaces ( places ) {
  const response = await fetch('http://localhost:3000/user-places', {
    method: 'PUT',
    body: JSON.stringify({places: places}),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Failed to update data');
  }

  return resData.message;
}

export async function fetchingUserPlaces () {
  const response = await fetch('http://localhost:3000/user-places');
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('failed getting data');
  }
  return resData.places;
}