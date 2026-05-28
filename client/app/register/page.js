"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BottomNav from "../../components/BottomNav";

export default function RegisterPage() {

  const router = useRouter();

  const [phone, setPhone] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [withdrawPassword,
    setWithdrawPassword] =
    useState("");

  const [referralCode,
    setReferralCode] =
    useState("");

  const [loading, setLoading] =
    useState(false);

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
            "Phone Number Must Be 10 Digits"
          );

          return;

        }

        if (
          withdrawPassword.length < 4
        ) {

          alert(
            "Withdraw Password Must Be Minimum 4 Digits"
          );

          return;

        }

        setLoading(true);

        const response =
          await fetch(
            "http://localhost:5000/api/auth/register",
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

          alert(
            "Registration Successful"
          );

          router.push(
            "/login"
          );

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

    <div className="min-h-screen bg-black text-white px-4 py-6 pb-28 overflow-hidden relative">

      {/* GLOW */}

      <div className="absolute top-0 left-[-120px] w-72 h-72 bg-pink-500/10 rounded-full blur-3xl">
      </div>

      <div className="absolute top-[45%] right-[-120px] w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl">
      </div>

      <div className="absolute bottom-0 left-[20%] w-72 h-72 bg-purple-500/10 rounded-full blur-3xl">
      </div>

      <div className="max-w-md mx-auto relative z-10">

        {/* HEADER */}

        <div className="text-center mb-8">

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 shadow-[0_0_25px_rgba(236,72,153,0.15)]">

            <div className="w-2 h-2 rounded-full bg-pink-400 animate-ping">
            </div>

            <p className="text-pink-400 font-bold text-xs tracking-[4px]">
              CREATE ACCOUNT
            </p>

          </div>

          <h1 className="text-5xl font-black mt-5 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-cyan-400 drop-shadow-[0_0_25px_rgba(168,85,247,0.8)] animate-pulse">

            REGISTER

          </h1>

          <p className="text-gray-400 mt-4 text-sm leading-7 px-4">

            Create your Luxora account
            and start earning with VIP
            investment plans.

          </p>

        </div>

        {/* FORM CARD */}

        <div className="relative bg-zinc-900 rounded-[38px] p-5 border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.05)] overflow-hidden">

          <div className="absolute -top-20 -right-10 w-52 h-52 bg-pink-500/10 rounded-full blur-3xl">
          </div>

          <div className="absolute bottom-0 left-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl">
          </div>

          <div className="relative z-10">

            <div className="space-y-5">

              <input
                type="number"
                placeholder="Enter Phone Number"
                value={phone}
                onChange={(e) =>
                  setPhone(
                    e.target.value
                  )
                }
                className="w-full bg-black/40 border border-white/10 rounded-3xl px-5 py-4 outline-none focus:border-pink-500 focus:shadow-[0_0_20px_rgba(236,72,153,0.2)] transition-all duration-300"
              />

              <input
                type="password"
                placeholder="Create Login Password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                className="w-full bg-black/40 border border-white/10 rounded-3xl px-5 py-4 outline-none focus:border-purple-500 focus:shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-all duration-300"
              />

              <input
                type="password"
                placeholder="Create Withdraw Password"
                value={withdrawPassword}
                onChange={(e) =>
                  setWithdrawPassword(
                    e.target.value
                  )
                }
                className="w-full bg-black/40 border border-white/10 rounded-3xl px-5 py-4 outline-none focus:border-cyan-500 focus:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all duration-300"
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
                className="w-full bg-black/40 border border-white/10 rounded-3xl px-5 py-4 outline-none focus:border-green-500 focus:shadow-[0_0_20px_rgba(34,197,94,0.2)] transition-all duration-300"
              />

            </div>

            {/* NOTICE */}

            <div className="relative bg-black/40 border border-white/10 rounded-[30px] p-5 mt-7 overflow-hidden">

              <div className="absolute inset-0 opacity-10 bg-gradient-to-r from-pink-500 to-cyan-500">
              </div>

              <div className="relative z-10 flex items-center justify-between">

                <div>

                  <p className="text-pink-400 font-black text-lg">
                    Secure Registration
                  </p>

                  <p className="text-sm text-gray-400 mt-2 leading-6">

                    Keep your login and
                    withdraw passwords safe.

                  </p>

                </div>

                <div className="text-5xl opacity-20">
                  🔐
                </div>

              </div>

            </div>

            {/* BUTTON */}

            <button
              onClick={
                handleRegister
              }
              disabled={loading}
              className="relative overflow-hidden w-full bg-gradient-to-r from-pink-600 via-purple-500 to-cyan-500 py-4 rounded-3xl font-black text-lg tracking-wide shadow-xl hover:shadow-[0_0_40px_rgba(168,85,247,0.35)] hover:scale-105 active:scale-95 transition-all duration-300 mt-7"
            >

              <span className="absolute inset-0 opacity-0 hover:opacity-100 transition-all duration-1000 bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.45),transparent)] translate-x-[-200%] hover:translate-x-[200%]">
              </span>

              <span className="relative z-10">

                {loading
                  ? "CREATING ACCOUNT..."
                  : "REGISTER NOW"}

              </span>

            </button>

            {/* LOGIN */}

            <div className="text-center mt-6">

              <p className="text-gray-400 text-sm">

                Already Have An Account?

              </p>

              <button
                onClick={() =>
                  router.push(
                    "/login"
                  )
                }
                className="mt-3 text-cyan-400 font-black text-lg"
              >

                LOGIN NOW

              </button>

            </div>

          </div>

        </div>

      </div>

      <BottomNav />

    </div>

  );
}