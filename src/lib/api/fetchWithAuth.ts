import { getAuthToken } from "../auth/getAuthToken";

export const fetchWithAuth = async (
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: any
) => {
  try {
    const token = await getAuthToken(); // Automatically fetch token

    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    // Only attach body for POST & PUT requests
    if (body && (method === 'POST' || method === 'PUT')) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    // Handle HTTP errors
    if (!response.ok) {
      let errorMessage = `API request failed (${response.status}): ${response.statusText}`;

      // Try parsing error response (if JSON)
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const errorResponse = await response.json();
        errorMessage = errorResponse.message || errorMessage;
      }

      throw new Error(errorMessage);
    }

    // Parse JSON response safely
    return await response.json();
  } catch (error) {
    console.error('❌ API fetch error:', error);
    throw error; // Re-throw for caller to handle
  }
};
