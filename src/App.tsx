import React, { FormEvent, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({ name: "" });
  const submitForm = async (form: HTMLFormElement) => {
    console.log("sending", form, formData);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => console.log("Form successfully submitted"))
      .catch((error) => alert(error));
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    submitForm(e.target as HTMLFormElement);
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
        <p>
          <button type="submit">Send</button>
        </p>
      </form>
    </div>
  );
}

export default App;
