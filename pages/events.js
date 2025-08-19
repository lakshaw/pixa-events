import { useEffect, useState } from "react";
import supabase from "../lib/supabaseClient";

export default function EventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("id, title, description, date, city");

      if (error) {
        console.error("Error fetching events:", error);
      } else {
        setEvents(data);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Upcoming Events</h1>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              <h2>{event.title}</h2>
              <p>{event.description}</p>
              <p>
                 {new Date(event.date).toLocaleDateString()} | {event.city}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
