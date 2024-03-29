// utilities/api.js

import axios from "axios";

// const BASE_URL = "https://api.example.com";

const BASE_URL = "https://jsonplaceholder.typicode.com/todos";

export async function fetchData(url) {
  try {
    const response = await axios.get(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
