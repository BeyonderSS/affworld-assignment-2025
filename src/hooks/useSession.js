import { getSession } from "@/app/actions/authActions"; // Import the serverless function to get the session
import { useEffect, useState } from "react"; // Import React hooks

// Custom hook to get session details in a client component
export default function useSession() {
  const [sessionData, setSessionData] = useState(null); // State to store complete session data
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication status

  useEffect(() => {
    // Function to check authentication and fetch session details
    const checkAuth = async () => {
      try {
        const session = await getSession(); // Call the serverless function to fetch session data
        if (session) {
          setSessionData(session); // Store the full session data if available
          setIsAuthenticated(true); // Mark as authenticated
        } else {
          setSessionData(null); // Clear session data if no session is found
          setIsAuthenticated(false); // Mark as not authenticated
        }
      } catch (error) {
        console.error("Error fetching session:", error); // Log any errors during the session fetch
        setSessionData(null); // Clear session data on error
        setIsAuthenticated(false); // Mark as not authenticated on error
      }
    };

    checkAuth(); // Call the authentication check function when the component mounts
  }, []); // Run the effect only once on component mount

  // Return both the authentication status and the full session data
  return { isAuthenticated, sessionData };
}
