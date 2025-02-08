// src/services/api.js

// Define the base URL for your API. If you are using Vite's proxy (e.g., /api),
// you can just use '/api' as your base URL. Otherwise, use the full URL like 'http://localhost:8000/api'.
const BASE_URL = '/api';

export async function getHelloMessage() {
  try {
    // Calling the FastAPI endpoint /api/hello. This will work if you have set up a proxy in vite.config.js.
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

// Add more API functions here as needed.
