"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  useRouter,
} from "next/navigation";

export default function RegisterPage() {

  const router =
    useRouter();

  const [phone, setPhone] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    withdrawPassword,
    setWithdrawPassword,
  ] = useState("");

  const [
    referralCode,
    setReferralCode,
  ] = useState("");

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
     REGISTER
  ========================= */

  const handleRegister =
    async () => {

      try {

        if (

          !phone ||

          !password ||

          !withdrawPassword

        ) {

          alert(
            "Please Fill All Fields"
          );

          return;

        }

        if (
          phone.length !== 10
        ) {

          alert(
            "Phone Must Be 10 Digits"
          );

          return;

        }

        if (
          password.length < 6
        ) {

          alert(
            "Password Minimum 6 Characters"
          );

          return;

        }

        if (
          withdrawPassword.length < 4
        ) {

          alert(
            "Withdraw Password Minimum 4 Digits"
          );

          return;

        }

        setLoading(true);

        const response =
          await fetch(

            "https://client-website-3rw8.onrender.com/api/auth/register",

            {

              method: "POST",

              headers: {

                "Content-Type":
                  "application/json",

              },

              body: JSON.stringify({

                phone,

                password,

                withdrawPassword,

                referralCode,

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

    <div className="min-h-screen bg-black text-white px-5 py-8 overflow-hidden relative flex items-center justify-center">

      {/* BACKGROUND */}

      <div className="absolute top-0 left-[-120px] w-80 h-80 bg-pink-500/10 rounded-full blur-3xl">
      </div>

      <div className="absolute bottom-0 right-[-120px] w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl">
      </div>

      {/* CARD */}

      <div className="w-full max-w-md relative z-10">

        <div className="bg-zinc-900 border border-white/10 rounded-[40px] p-7 shadow-[0_0_40px_rgba(255,255,255,0.05)] overflow-hidden relative">

          <div className="absolute -top-20 -right-10 w-52 h-52 bg-pink-500/10 rounded-full blur-3xl">
          </div>

          <div className="relative z-10">

            {/* HEADER */}

            <div className="text-center mb-8">

              <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-cyan-400">

                Luxora

              </h1>

              <p className="text-gray-400 mt-4">

                Create Your Account 🚀

              </p>

            </div>

            {/* INPUTS */}

            <div className="space-y-5">

              <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) =>
                  setPhone(

                    e.target.value.replace(
                      /\\D/g,
                      ""
                    )

                  )
                }
                maxLength={10}
                className="w-full bg-black/40 border border-white/10 rounded-3xl px-5 py-4 outline-none focus:border-pink-500 transition-all"
              />

              <input
                type="password"
                placeholder="Login Password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                className="w-full bg-black/40 border border-white/10 rounded-3xl px-5 py-4 outline-none focus:border-purple-500 transition-all"
              />

              <input
                type="password"
                placeholder="Withdraw Password"
                value={withdrawPassword}
                onChange={(e) =>
                  setWithdrawPassword(
                    e.target.value
                  )
                }
                className="w-full bg-black/40 border border-white/10 rounded-3xl px-5 py-4 outline-none focus:border-cyan-500 transition-all"
              />

              <input
                type="text"
                placeholder="Referral Code (Optional)"
                value={referralCode}
                onChange={(e) =>
                  setReferralCode(
                    e.target.value
                  )
                }
                className="w-full bg-black/40 border border-white/10 rounded-3xl px-5 py-4 outline-none focus:border-green-500 transition-all"
              />

            </div>

            {/* BUTTON */}

            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full mt-7 bg-gradient-to-r from-pink-600 via-purple-500 to-cyan-500 py-4 rounded-3xl font-black text-lg hover:scale-105 active:scale-95 transition-all duration-300"
            >

              {

                loading

                  ? "CREATING ACCOUNT..."

                  : "REGISTER NOW"

              }

            </button>

            {/* LOGIN */}

            <p className="text-center text-gray-400 mt-7">

              Already have an account?

              <Link
                href="/login"
                className="text-cyan-400 font-black ml-2"
              >

                Login

              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}