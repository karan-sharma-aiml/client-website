"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

export default function LoginPage() {

  const [phone, setPhone] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  /* =========================
     AUTO REDIRECT
  ========================= */

  useEffect(() => {

    const token =
      localStorage.getItem(
        "token"
      );

    if (token) {

      window.location.href =
        "/dashboard";

    }

  }, []);

  /* =========================
     LOGIN
  ========================= */

  const handleLogin =
    async () => {

      if (
        !phone ||
        !password
      ) {

        alert(
          "Please Fill All Fields"
        );

        return;

      }

      try {

        setLoading(true);

        const response =
          await fetch(

            "https://client-website-3rw8.onrender.com/api/auth/login",

            {

              method: "POST",

              headers: {

                "Content-Type":
                  "application/json",

              },

              body: JSON.stringify({

                phone,

                password,

              }),

            }

          );

        const data =
          await response.json();

        if (data.success) {

          localStorage.setItem(

            "token",

            data.token

          );

          localStorage.setItem(

            "user",

            JSON.stringify(
              data.user
            )

          );

          window.location.href =
            "/dashboard";

        } else {

          alert(
            data.message
          );

        }

      } catch (error) {

        console.log(error);

        alert(
          "Server Error"
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="min-h-screen bg-black text-white flex items-center justify-center px-5 overflow-hidden relative">

      {/* BACKGROUND */}

      <div className="absolute top-0 left-[-120px] w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl">
      </div>

      <div className="absolute bottom-0 right-[-120px] w-80 h-80 bg-pink-500/10 rounded-full blur-3xl">
      </div>

      {/* CARD */}

      <div className="w-full max-w-md relative z-10">

        <div className="bg-zinc-900 border border-white/10 rounded-[40px] p-7 shadow-[0_0_40px_rgba(255,255,255,0.04)] overflow-hidden relative">

          {/* GLOW */}

          <div className="absolute -top-20 -right-10 w-52 h-52 bg-yellow-500/10 rounded-full blur-3xl">
          </div>

          <div className="relative z-10">

            {/* HEADER */}

            <div className="text-center mb-8">

              <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-500">

                Luxora

              </h1>

              <p className="text-gray-400 mt-4">

                Welcome Back 👋

              </p>

            </div>

            {/* PHONE */}

            <div className="mb-5">

              <label className="text-gray-400 text-sm">

                Phone Number

              </label>

              <input
                type="text"
                placeholder="Enter Phone Number"
                value={phone}
                onChange={(e) =>
                  setPhone(
                    e.target.value
                  )
                }
                className="w-full mt-3 bg-black/40 border border-white/10 rounded-3xl px-5 py-4 outline-none focus:border-yellow-500 transition-all"
              />

            </div>

            {/* PASSWORD */}

            <div className="mb-6">

              <label className="text-gray-400 text-sm">

                Password

              </label>

              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                className="w-full mt-3 bg-black/40 border border-white/10 rounded-3xl px-5 py-4 outline-none focus:border-yellow-500 transition-all"
              />

            </div>

            {/* BUTTON */}

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 py-4 rounded-3xl text-black font-black text-lg hover:scale-105 active:scale-95 transition-all duration-300"
            >

              {

                loading

                  ? "PLEASE WAIT..."

                  : "LOGIN"

              }

            </button>

            {/* REGISTER */}

            <p className="text-center text-gray-400 mt-7">

              Don't have an account?

              <Link
                href="/register"
                className="text-yellow-400 font-bold ml-2"
              >

                Register

              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}