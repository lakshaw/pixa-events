import { useEffect, useState } from "react";
import supabase from "../lib/supabaseClient";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from("users").select("*");
      if (error) {
        console.error("Error fetching users:", error.message);
      } else {
        setUsers(data || []);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Users</h1>
      {loading ? (
        <p>Loading...</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.id} - {user.name} ({user.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
