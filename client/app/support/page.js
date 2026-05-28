"use client";

import BottomNav from "../../components/BottomNav";

export default function SupportPage() {

  const supportList = [
    {
      title: "Telegram Support",
      value: "@BestWorkshop98_bot",
      color:
        "from-cyan-500 via-blue-500 to-indigo-500",
      icon: "✈️",
      button: "Open Telegram",
      link:
        "https://t.me/BestWorkshop98_bot",
    },
  ];

  return (

    <div className="min-h-screen bg-black text-white px-4 pt-6 pb-32 overflow-hidden">

      <div className="max-w-md mx-auto">

        {/* HEADER */}

        <div className="text-center">

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.2)]">

            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping">
            </div>

            <p className="text-cyan-400 text-xs tracking-[4px] font-black">

              SUPPORT AVAILABLE

            </p>

          </div>

          <h1 className="text-5xl font-black mt-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 drop-shadow-[0_0_25px_rgba(59,130,246,0.5)]">

            Help Center

          </h1>

          <p className="text-gray-400 mt-4 text-sm leading-6 px-5">

            Official Luxora Telegram support is
            available daily from 8:00 AM to
            5:00 PM for recharge, withdraw and
            account related help.

          </p>

        </div>

        {/* SUPPORT CARD */}

        <div className="mt-10">

          {supportList.map((item, index) => (

            <div
              key={index}
              className={`relative bg-gradient-to-r ${item.color} rounded-[36px] p-[1.5px] shadow-[0_0_35px_rgba(255,255,255,0.08)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-500`}
            >

              <div className="relative bg-zinc-900 rounded-[36px] p-6 overflow-hidden">

                <div className="absolute -top-16 -right-10 w-52 h-52 bg-white/5 rounded-full blur-3xl">
                </div>

                <div className="absolute -bottom-16 -left-10 w-44 h-44 bg-white/5 rounded-full blur-3xl">
                </div>

                <div className="relative z-10">

                  <div className="flex items-center justify-between">

                    <div>

                      <div className={`inline-flex px-4 py-1 rounded-full bg-gradient-to-r ${item.color} text-white text-xs font-black shadow-lg`}>

                        OFFICIAL SUPPORT

                      </div>

                      <h2 className="text-3xl font-black mt-4">

                        {item.title}

                      </h2>

                    </div>

                    <div className="text-7xl animate-bounce">

                      {item.icon}

                    </div>

                  </div>

                  <div className="mt-6 bg-black/40 border border-white/10 rounded-3xl p-5 backdrop-blur-xl">

                    <p className="text-gray-400 text-xs uppercase tracking-[4px]">

                      Telegram Username

                    </p>

                    <h3 className="text-2xl font-black mt-3 break-all text-cyan-300">

                      {item.value}

                    </h3>

                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-4">

                    <div className="bg-black/40 border border-white/10 rounded-3xl p-4 text-center backdrop-blur-xl">

                      <p className="text-gray-400 text-xs tracking-[3px]">

                        AVAILABLE

                      </p>

                      <h3 className="text-lg font-black text-green-400 mt-2">

                        ONLINE

                      </h3>

                    </div>

                    <div className="bg-black/40 border border-white/10 rounded-3xl p-4 text-center backdrop-blur-xl">

                      <p className="text-gray-400 text-xs tracking-[3px]">

                        SUPPORT TIME

                      </p>

                      <h3 className="text-lg font-black text-yellow-400 mt-2">

                        8AM - 5PM

                      </h3>

                    </div>

                  </div>

                  <a
                    href={item.link}
                    target="_blank"
                  >

                    <button
                      className={`relative overflow-hidden w-full mt-6 bg-gradient-to-r ${item.color} py-4 rounded-3xl font-black text-lg tracking-wide shadow-xl hover:shadow-[0_0_35px_rgba(59,130,246,0.4)] hover:scale-105 active:scale-95 transition-all duration-300`}
                    >

                      <span className="absolute inset-0 opacity-0 hover:opacity-100 transition-all duration-700 bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.35),transparent)] translate-x-[-200%] hover:translate-x-[200%]">
                      </span>

                      <span className="relative z-10">

                        {item.button}

                      </span>

                    </button>

                  </a>

                </div>

              </div>

            </div>

          ))}

        </div>

        {/* NOTICE */}

        <div className="mt-8 bg-zinc-900 rounded-[34px] p-6 border border-cyan-500/20 shadow-[0_0_35px_rgba(6,182,212,0.08)]">

          <h2 className="text-2xl font-black text-cyan-400 mb-5">

            Support Timing

          </h2>

          <div className="space-y-4 text-gray-400 text-sm leading-7">

            <div className="flex gap-3">

              <span className="text-cyan-400">
                •
              </span>

              Telegram support available from
              8:00 AM to 5:00 PM

            </div>

            <div className="flex gap-3">

              <span className="text-cyan-400">
                •
              </span>

              Recharge approval may take
              5-10 minutes

            </div>

            <div className="flex gap-3">

              <span className="text-cyan-400">
                •
              </span>

              Withdraw requests are checked
              manually by support team

            </div>

            <div className="flex gap-3">

              <span className="text-cyan-400">
                •
              </span>

              Never share your password or OTP
              with anyone

            </div>

          </div>

        </div>

      </div>

      <BottomNav />

    </div>

  );
}