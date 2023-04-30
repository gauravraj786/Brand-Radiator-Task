import React, { useState } from "react";
import "./ContactUs.css";

function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    // Send form data to server
    fetch("http://localhost:3000/comments", {
      method: "POST",
      body: JSON.stringify({ name, email, message }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));

    // Clear form input values
    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <div>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="feedback-input"
          type="text"
          name="name"
          value={name}
          placeholder="Name"
          onChange={(event) => setName(event.target.value)}
        />
        <br />
        <input
          className="feedback-input"
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <br />

        <textarea
          className="feedback-input"
          name="message"
          value={message}
          placeholder="Message"
          onChange={(event) => setMessage(event.target.value)}
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default ContactUs;
