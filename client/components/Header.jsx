"use client";

export default function Header({
  phone,
}) {

  return (

    <div className="flex items-center justify-between mb-8">

      <div>

        <p className="text-gray-400 text-sm">

          Welcome Back 👋

        </p>

        <h1 className="text-3xl font-black mt-1">

          {phone}

        </h1>

      </div>

      <a href="/vip">

        <div className="relative">

          <div className="absolute inset-0 bg-yellow-500 blur-2xl opacity-40 rounded-full">
          </div>

          <div className="relative w-16 h-16 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center text-3xl">

            💎

          </div>

        </div>

      </a>

    </div>

  );

}