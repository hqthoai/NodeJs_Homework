const API_URL = 'http://localhost:8000'

async function httpGetPlanets() {
  const res = await fetch(`${API_URL}/planets`);
  return await res.json();
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  const res = await fetch(`${API_URL}/launches`);
  const fetchLaunches =  await res.json();
  return fetchLaunches.sort((a,b) => a.flightNumber - b.flightNumber);
}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  try {
    await fetch(`${API_URL}/launches`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(launch),
    })
    return {
      ok: true
    }
  } catch (error) {
    return {
      ok: false
    }
  }
}

  // Delete launch with given ID.
async function httpAbortLaunch(id) {
  try {
    await fetch(`${API_URL}/launches/${id}`, {
      method: "delete",
    })
    return {
      ok: true
    }
  } catch (error) {
    return {
      ok: false
    }
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};