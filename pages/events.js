// Import React hooks and Supabase client
import { useState, useEffect } from "react";
import supabase from "../lib/supabaseClient";

// This component displays all upcoming events from Supabase
export default function EventsPage() {
  // State to store the list of events
  const [events, setEvents] = useState([]);

  // useEffect runs once when the component mounts
  useEffect(() => {
    // Async function to fetch events from Supabase
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from("events") // Table name
        .select("id, title, description, date, city"); // Columns to fetch

      if (error) {
        // If there is an error fetching data, log it
        console.error("Error fetching events:", error);
      } else {
        // Save the fetched events to state
        setEvents(data);
      }
    };

    // Call the fetch function
    fetchEvents();
  }, []); // Empty dependency array = run only once on mount

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Upcoming Events</h1>

      {/* Show message if no events found */}
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <ul>
          {/* Loop through events and display each one */}
          {events.map((event) => (
            <li key={event.id}>
              <h2>{event.title}</h2>
              <p>{event.description}</p>
              <p>
                {/* Format the date nicely and show city */}
                {new Date(event.date).toLocaleDateString()} | {event.city}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
