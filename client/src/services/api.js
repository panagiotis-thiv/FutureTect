// Define the base URL for your API. If you are using Vite's proxy (e.g., /api),
// you can just use '/api' as your base URL. Otherwise, use the full URL like 'http://localhost:8000/api'.
const BASE_URL = '/api';

/**
 * Fetches the hello message from the FastAPI backend.
 * @returns {Promise<Object>} The response from the /api/hello endpoint.
 */
export async function getHelloMessage() {
  try {
    // Calling the FastAPI endpoint /api/hello.
    const response = await fetch(`${BASE_URL}/hello`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Return the JSON parsed response
    return await response.json();
  } catch (error) {
    console.error('Error fetching hello message:', error);
    throw error;
  }
}

/**
 * Fetches the estimated results from the FastAPI backend.
 * @param {number} buildingSize - The size of the building in square feet.
 * @param {number} wwr - The window-to-wall ratio.
 * @param {number} insulation - The insulation quality score.
 * @param {number} lat - The latitude of the building's location.
 * @param {number} lon - The longitude of the building's location.
 * @returns {Promise<Object>} The predicted results from the /api/estimate endpoint.
 */
export async function getEstimate(buildingSize, wwr, insulation, lat, lon) {
  try {
    // Construct the query parameters for the API call
    const params = new URLSearchParams({
      building_size: Number(buildingSize),  // ✅ Ensure float
      wwr: Number(wwr),  
      insulation: Number(insulation),  
      lat: Number(lat),  
      lon: Number(lon),
    });
    

    console.log(params.toString());

    // Calling the FastAPI endpoint /api/estimate with query parameters
    const response = await fetch(`${BASE_URL}/estimate?${params.toString()}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Return the JSON parsed response
    return await response.json();
  } catch (error) {
    console.error('Error fetching estimate:', error);
    throw error;
  }
}

// Add more API functions here as needed.