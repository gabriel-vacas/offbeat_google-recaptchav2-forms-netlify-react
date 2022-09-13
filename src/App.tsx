import React, { FormEvent, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({ name: "" });

  const encode = (data: any) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  };

  const handleFormSubmit = async (e: FormEvent) => {
    console.log("sending", e, formData);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...formData }),
    })
      .then(() => alert("Success!"))
      .catch((error) => alert(error));

    e.preventDefault();
  };

  return (
    <div className="App">
      <form
        name="contact"
        method="POST"
        data-netlify="true"
        onSubmit={handleFormSubmit}
      >
        <p>
          <label>
            Your Name:{" "}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => {
                const { value } = e.currentTarget;
                setFormData({ name: value });
              }}
            />
          </label>
        </p>
        <input type="hidden" name="form-name" value="contact" />
        <p>
          <button type="submit">Send</button>
        </p>
      </form>
    </div>
  );
}

export default App;
