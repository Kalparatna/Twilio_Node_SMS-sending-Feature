import React, { useState } from "react";
import axios from "axios";
import './contact.css';

const Contact = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phoneNumber || !message) {
      setStatusMessage("Please enter both a phone number and a message.");
      return;
    }

    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL || "http://localhost:3000/send-sms", // Use environment variable for production URL
        {
          to: phoneNumber,
          message: message,
        }
      );

      if (response.data.success) {
        console.log("Message sent successfully:", response.data);
        setStatusMessage("Message sent successfully!");
        setPhoneNumber("");
        setMessage("");
      }
    } catch (error) {
      setStatusMessage("Failed to send message.");
      console.error("Error sending SMS:", error);
    }
  };

  return (
    <div>
      <h2>Send SMS</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send SMS</button>
      </form>
      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
};

export default Contact;
