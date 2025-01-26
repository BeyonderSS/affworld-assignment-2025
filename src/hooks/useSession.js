import { getSession } from "@/app/actions/authActions"; // Import the serverless function to get the session
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"; // Import React hooks

// Custom hook to get session details and sign out
export default function useSession() {
  const [sessionData, setSessionData] = useState(null); // State to store complete session data
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication status
  const router = useRouter(); // Initialize router to trigger refresh after sign out

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

  // Function to handle sign out
  const signOut = async () => {
    try {
      const res = await fetch("/api/auth/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();
      if (result.success) {
        // Clear session data locally
        setSessionData(null);
        setIsAuthenticated(false);

        // Trigger page refresh after sign out
        router.refresh();
      } else {
        console.error("Error during sign out:", result.message);
      }
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  // Return both the authentication status, session data, and signOut function
  return { isAuthenticated, sessionData, signOut };
}
