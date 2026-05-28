"use client";

import { useState } from "react";

export default function LoginPage() {

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {

    if (!phone || !password) {
      alert("Please fill all fields");
      return;
    }

    try {

      setLoading(true);

      const response = await fetch(
        "https://client-website-3rw8.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            phone,
            password,
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      if (data.success) {

        localStorage.setItem(
          "token",
          data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        alert("Login Successful 🚀");

        window.location.href = "/";

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.log(error);

      alert("Something went wrong");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#111",
      }}
    >

      <div
        style={{
          width: "320px",
          padding: "25px",
          background: "#222",
          borderRadius: "15px",
          boxShadow: "0 0 20px rgba(255,215,0,0.2)",
        }}
      >

        <h1
          style={{
            color: "gold",
            marginBottom: "20px",
            textAlign: "center",
            fontSize: "28px",
            fontWeight: "bold",
          }}
        >
          Luxora Login
        </h1>

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }

          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #444",
            outline: "none",
            background: "#333",
            color: "white",
            fontSize: "15px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }

          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #444",
            outline: "none",
            background: "#333",
            color: "white",
            fontSize: "15px",
          }}
        />

        <button
          onClick={handleLogin}

          style={{
            width: "100%",
            padding: "12px",
            background: "gold",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          {loading ? "Loading..." : "Login"}
        </button>

      </div>

    </div>
  );
}