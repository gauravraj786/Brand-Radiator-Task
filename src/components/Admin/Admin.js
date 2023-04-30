import React, { useState } from "react";
import "./Admin.css";

function Admin() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [uname, setUname] = useState("");
  const [pass, setPass] = useState("");
  const [errorMessages, setErrorMessages] = useState({});

  // User Login info
  const database = [
    {
      username: "user1",
      password: "pass1",
    },
    {
      username: "user2",
      password: "pass2",
    },
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password",
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    // Find user login info
    const userData = database.find((user) => user.username === uname);

    // Compare user info
    if (userData) {
      if (userData.password !== pass) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        // Send login info to API
        fetch("http://localhost:3000/comments")
          .then((res) => res.json())
          .then((data) => {
            // Set contacts data and login state
            setContacts(data);
            setLoggedIn(true);
          })
          .catch((err) => console.error(err));
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
    setUname("");
    setPass("");
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="text"
            name="uname"
            value={uname}
            placeholder="Username"
            required
            onChange={(event) => setUname(event.target.value)}
          />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <input
            type="password"
            name="pass"
            value={pass}
            placeholder="Password"
            required
            onChange={(event) => setPass(event.target.value)}
          />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );
  return (
    <div>
      {loggedIn ? (
        <div className="admin-dashboard">
          <h1>Admin Dashboard</h1>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <div className="title">Login</div>
          {renderForm}
        </div>
      )}
    </div>
  );
}

export default Admin;
