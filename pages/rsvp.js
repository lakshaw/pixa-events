// Import React hook useState and Supabase client
import { useState } from "react";
import supabase from "../lib/supabaseClient";

// This component allows a user to RSVP to an event
export default function RSVPPage() {
  // State variables to store input values and messages
  const [userId, setUserId] = useState(""); // User ID input
  const [eventId, setEventId] = useState(""); // Event ID input
  const [status, setStatus] = useState(""); // RSVP status (Yes/No/Maybe)
  const [message, setMessage] = useState(""); // Feedback message

  // Function to handle submitting the RSVP
  const handleRSVP = async () => {
    // Check if all fields are filled
    if (!userId || !eventId || !status) {
      setMessage("Please enter User ID, Event ID, and select a status.");
      return;
    }

    // Insert RSVP into Supabase table 'rsvps'
    const { error } = await supabase.from("rsvps").insert([
      { user_id: userId, event_id: eventId, status },
    ]);

    if (error) {
      // Show error message if insertion fails
      setMessage("Error saving RSVP: " + error.message);
    } else {
      // Success message and reset inputs
      setMessage("RSVP saved successfully!");
      setUserId("");
      setEventId("");
      setStatus("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>RSVP to an Event</h1>

      {/* Input for User ID */}
      <label>User ID: </label>
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Enter your User ID"
      />
      <br /><br />

      {/* Input for Event ID */}
      <label>Event ID: </label>
      <input
        type="text"
        value={eventId}
        onChange={(e) => setEventId(e.target.value)}
        placeholder="Enter event ID"
      />
      <br /><br />

      {/* Select RSVP status */}
      <label>Status: </label>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">--Choose--</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
        <option value="Maybe">Maybe</option>
      </select>
      <br /><br />

      {/* Button to submit RSVP */}
      <button onClick={handleRSVP}>Submit RSVP</button>

      {/* Display feedback message */}
      <p>{message}</p>
    </div>
  );
}
