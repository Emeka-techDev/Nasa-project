const API_URI = 'http://localhost:8000/v1';

async function httpGetPlanets() {
  // TODO: Once API is ready.
  // Load planets and return as JSON.
  try {
    const response = await fetch( `${API_URI}/planets`);
    console.log(`unconverted response is ${response}`)
    return await response.json();
  
  } catch(err) {
    throw err.message
  
  }
}

async function httpGetLaunches() {
  // TODO: Once API is ready.
  // Load launches, sort by flight number, and return as JSON.

  const response = await fetch(`${API_URI}/launches`)
  const launches = await response.json();
  console.log(`Launches are ${launches}`)

  return launches;

}



async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
  try {
    return await fetch(`${API_URI}/launches`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(launch)
    })  
  
  } catch(err) {
    return {
      ok: false
    }
  }

}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
  let response = await fetch(`${API_URI}/launches/${id}`, {
    method: 'DELETE',
  })

  return response;
  
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};