import React, { FormEvent, useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({ name: "" });
  const RECAPTCHA_KEY = "6LccbvchAAAAANpZl3ELcFO_OYA8l7yA25AZMWs7";
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
        <input
          type="text"
          name="G00N8X00000G522w"
          value="123"
        />
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
        <p>
          <button type="submit">Send</button>
        </p>
      </form>
    </div>
  );
}

export default App;
