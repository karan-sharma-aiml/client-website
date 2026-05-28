"use client";

import BottomNav from "../../components/BottomNav";

export default function TaskPage() {

  const tasks = [

    {
      title:
        "Daily Check-In",
      reward: "₹20",
      icon: "🎁",
      button: "Claim",
      color:
        "from-yellow-500 to-orange-500",
    },

    {
      title:
        "Watch Reward Video",
      reward: "₹50",
      icon: "🎬",
      button: "Watch",
      color:
        "from-pink-500 to-rose-500",
    },

    {
      title:
        "Invite 1 Friend",
      reward: "₹100",
      icon: "👥",
      button: "Invite",
      color:
        "from-cyan-500 to-blue-500",
    },

    {
      title:
        "VIP Purchase Bonus",
      reward: "₹500",
      icon: "👑",
      button: "Unlock",
      color:
        "from-violet-500 to-purple-500",
    },

    {
      title:
        "Complete Recharge",
      reward: "₹80",
      icon: "💰",
      button: "Recharge",
      color:
        "from-green-500 to-emerald-500",
    },

  ];

  return (

    <div className="min-h-screen bg-black text-white px-4 py-6 pb-28 overflow-hidden relative">

      {/* BACKGROUND EFFECTS */}

      <div className="absolute top-[-100px] left-[-100px] w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl animate-pulse">
      </div>

      <div className="absolute top-[35%] right-[-120px] w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse">
      </div>

      <div className="absolute bottom-[-100px] left-[20%] w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse">
      </div>

      <div className="max-w-md mx-auto relative z-10">

        {/* HEADER */}

        <div className="text-center mb-8">

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 shadow-[0_0_20px_rgba(250,204,21,0.2)]">

            <span className="text-yellow-400">
              ✦
            </span>

            <p className="text-yellow-400 text-xs tracking-[3px] font-black">
              DAILY REWARDS
            </p>

          </div>

          <h1 className="text-5xl font-black mt-5 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-500 to-pink-500 drop-shadow-[0_0_30px_rgba(249,115,22,0.45)] animate-pulse">

            Daily Tasks

          </h1>

          <p className="text-gray-400 mt-3 text-sm leading-6 px-5">
            Complete daily missions and
            unlock exciting rewards.
          </p>

        </div>

        {/* BONUS CARD */}

        <div className="relative rounded-[40px] p-[1.5px] bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 shadow-[0_0_60px_rgba(249,115,22,0.35)] overflow-hidden">

          <div className="bg-zinc-900 rounded-[40px] p-6 relative overflow-hidden">

            <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.08),transparent)] translate-x-[-200%] animate-[shine_6s_linear_infinite]">
            </div>

            <div className="absolute -top-20 -right-10 w-60 h-60 bg-yellow-500/10 rounded-full blur-3xl">
            </div>

            <div className="absolute bottom-0 left-0 w-44 h-44 bg-pink-500/10 rounded-full blur-3xl">
            </div>

            <div className="relative z-10 flex items-center justify-between">

              <div>

                <p className="text-gray-400 text-xs uppercase tracking-[4px]">
                  Today Bonus
                </p>

                <h2 className="text-5xl font-black mt-4 text-yellow-400 drop-shadow-[0_0_18px_rgba(250,204,21,0.8)]">

                  ₹850

                </h2>

                <p className="text-gray-400 text-sm mt-3">
                  Complete all tasks to unlock
                  extra rewards.
                </p>

              </div>

              <div className="text-7xl animate-bounce opacity-30">
                🎯
              </div>

            </div>

          </div>

        </div>

        {/* TASK LIST */}

        <div className="space-y-5 mt-8">

          {tasks.map(
            (task, index) => (

              <div
                key={index}
                className={`relative rounded-[36px] p-[1.5px] bg-gradient-to-r ${task.color} shadow-[0_0_30px_rgba(255,255,255,0.06)] overflow-hidden hover:scale-[1.02] active:scale-[0.99] transition-all duration-300`}
              >

                <div className="bg-zinc-900 rounded-[36px] p-5 relative overflow-hidden">

                  <div className={`absolute top-0 right-0 w-40 h-40 rounded-full bg-gradient-to-r ${task.color} blur-3xl opacity-10`}>
                  </div>

                  <div className="relative z-10 flex items-center justify-between gap-4">

                    {/* LEFT */}

                    <div className="flex items-center gap-4">

                      <div className={`w-16 h-16 rounded-3xl bg-gradient-to-r ${task.color} flex items-center justify-center text-3xl shadow-[0_0_25px_rgba(255,255,255,0.15)]`}>

                        {task.icon}

                      </div>

                      <div>

                        <h2 className="text-xl font-black">

                          {task.title}

                        </h2>

                        <p className="text-green-400 text-lg font-black mt-1 drop-shadow-[0_0_10px_rgba(74,222,128,0.7)]">

                          Reward:
                          {" "}
                          {task.reward}

                        </p>

                      </div>

                    </div>

                  </div>

                  {/* BUTTON */}

                  <button
                    className={`relative overflow-hidden w-full mt-5 bg-gradient-to-r ${task.color} py-4 rounded-3xl font-black text-lg tracking-wide shadow-[0_0_35px_rgba(255,255,255,0.12)] hover:scale-105 active:scale-95 transition-all duration-300`}
                  >

                    <span className="absolute inset-0 opacity-0 hover:opacity-100 transition-all duration-1000 bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.35),transparent)] translate-x-[-200%] hover:translate-x-[200%]">
                    </span>

                    <span className="relative z-10">

                      {task.button}

                    </span>

                  </button>

                </div>

              </div>

            )
          )}

        </div>

      </div>

      <BottomNav />

    </div>

  );
}