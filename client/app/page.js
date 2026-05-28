"use client";

import Link from "next/link";

export default function LandingPage() {

  return (

    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">

      <div className="max-w-md w-full text-center">

        <h1 className="text-6xl font-black text-yellow-400 mb-6">
          Luxora
        </h1>

        <p className="text-gray-400 mb-10">
          Premium Investment Platform
        </p>

        <div className="space-y-5">

          <Link href="/register">

            <button className="w-full bg-yellow-500 text-black py-4 rounded-3xl font-black">

              CREATE ACCOUNT

            </button>

          </Link>

          <Link href="/login">

            <button className="w-full bg-zinc-900 border border-white/10 py-4 rounded-3xl font-black">

              LOGIN

            </button>

          </Link>

        </div>

      </div>

    </div>

  );

}