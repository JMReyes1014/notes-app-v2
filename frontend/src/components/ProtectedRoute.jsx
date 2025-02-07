import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";


function ProtectedRoute({ children }) {
  // Children is the component that will be rendered if the user is authenticated
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => { // This hook will run when the component is mounted
    authorize().catch(() => setIsAuthorized(false)); // Check if the user is authorized
  }, [])

  const refreshToken = async () => {
    // Function to refresh the token
    const refreshToken = localStorage.getItem(REFRESH_TOKEN); // Get the refresh token from local storage
    try {
      const response = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      }); // Send a request to the refresh token endpoint
      if (response.status === 200) {
        // If the request is successful
        localStorage.setItem(ACCESS_TOKEN, response.data.access); // Save the new access token
        setIsAuthorized(true); // Set the authorization status to true
      } else {
        setIsAuthorized(false); // If the request is not successful, set the authorization status to false
      }
    } catch (error) {
      console.log(error);
      setIsAuthorized(false);
    }
  };

  const authorize = async () => {
    // Function to check if the user is authorized
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }
    const decodedToken = jwtDecode(token); // Decode the token
    const tokenExpiration = decodedToken.exp; // Get the expiration time of the token
    const now = Date.now() / 1000; // Get the current time in seconds

    if (tokenExpiration < now) {
      // If the token has expired, refresh it
      await refreshToken();
    } else {
      setIsAuthorized(true); // If the token is still valid, set the authorization status
    }
  };

  if (isAuthorized === null) {
    // If the authorization status is not yet known, return null
    return <div>Loading...</div>;
  }

  return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
