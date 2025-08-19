// Import React hooks and Supabase client
import { useEffect, useState } from "react";
import supabase from "../lib/supabaseClient";

// This component displays all users from the Supabase 'users' table
export default function UsersPage() {
  // State to store list of users
  const [users, setUsers] = useState([]);
  // State to handle loading indicator
  const [loading, setLoading] = useState(true);

  // useEffect runs once when the component mounts
  useEffect(() => {
    // Async function to fetch users from Supabase
    const fetchUsers = async () => {
      const { data, error } = await supabase.from("users").select("*"); // Fetch all columns

      if (error) {
        // Log error if fetching fails
        console.error("Error fetching users:", error.message);
      } else {
        // Save fetched users or empty array if none
        setUsers(data || []);
      }

      // Stop loading once data is fetched
      setLoading(false);
    };

    // Call the fetch function
    fetchUsers();
  }, []); // Empty dependency array = run only once on mount

  return (
    <div style={{ padding: "20px" }}>
      <h1>Users</h1>

      {/* Show loading message while fetching data */}
      {loading ? (
        <p>Loading...</p>
      ) : users.length === 0 ? (
        // Message if no users are found
        <p>No users found.</p>
      ) : (
        // Display list of users
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {/* Show user ID, name, and email */}
              {user.id} - {user.name} ({user.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
