import { useState } from "react";
import supabase from "../lib/supabaseClient";

export default function RSVPPage() {
  const [userId, setUserId] = useState("");
  const [eventId, setEventId] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  const handleRSVP = async () => {
    if (!userId || !eventId || !status) {
      setMessage("Please enter User ID, Event ID, and select a status.");
      return;
    }

    const { error } = await supabase.from("rsvps").insert([
      { user_id: userId, event_id: eventId, status },
    ]);

    if (error) {
      setMessage("Error saving RSVP: " + error.message);
    } else {
      setMessage("RSVP saved successfully!");
      setUserId("");
      setEventId("");
      setStatus("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>RSVP to an Event</h1>

      <label>User ID: </label>
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Enter your User ID"
      />
      <br /><br />

      <label>Event ID: </label>
      <input
        type="text"
        value={eventId}
        onChange={(e) => setEventId(e.target.value)}
        placeholder="Enter event ID"
      />
      <br /><br />

      <label>Status: </label>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">--Choose--</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
        <option value="Maybe">Maybe</option>
      </select>
      <br /><br />

      <button onClick={handleRSVP}>Submit RSVP</button>

      <p>{message}</p>
    </div>
  );
}
