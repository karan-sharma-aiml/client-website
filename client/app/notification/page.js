"use client";

import BottomNav from "../../components/BottomNav";

export default function NotificationPage() {

  const notifications = [

    {
      title:
        "VIP Bonus Credited",
      message:
        "₹500 VIP income added successfully.",
      time: "2 min ago",
      icon: "💎",
      color:
        "from-yellow-500 to-orange-500",
    },

    {
      title:
        "Recharge Successful",
      message:
        "Your ₹1000 recharge has been approved.",
      time: "10 min ago",
      icon: "💰",
      color:
        "from-green-500 to-emerald-500",
    },

    {
      title:
        "Withdrawal Processed",
      message:
        "₹700 transferred to your bank account.",
      time: "30 min ago",
      icon: "🏦",
      color:
        "from-cyan-500 to-blue-500",
    },

    {
      title:
        "Referral Joined",
      message:
        "Rahul joined using your invite link.",
      time: "1 hour ago",
      icon: "👥",
      color:
        "from-pink-500 to-rose-500",
    },

    {
      title:
        "Daily Reward",
      message:
        "Claim your daily reward now.",
      time: "2 hours ago",
      icon: "⚡",
      color:
        "from-violet-500 to-purple-500",
    },

  ];

  return (

    <div className="min-h-screen bg-black text-white px-4 py-6 pb-28 overflow-hidden relative">

      {/* BACKGROUND EFFECTS */}

      <div className="absolute top-[-100px] left-[-100px] w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse">
      </div>

      <div className="absolute top-[35%] right-[-100px] w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse">
      </div>

      <div className="absolute bottom-[-100px] left-[20%] w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl animate-pulse">
      </div>

      <div className="max-w-md mx-auto relative z-10">

        {/* HEADER */}

        <div className="text-center mb-8">

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,0.2)]">

            <span className="text-cyan-400">
              ✦
            </span>

            <p className="text-cyan-400 text-xs tracking-[3px] font-black">
              LATEST UPDATES
            </p>

          </div>

          <h1 className="text-5xl font-black mt-5 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 drop-shadow-[0_0_30px_rgba(59,130,246,0.45)] animate-pulse">

            Notifications

          </h1>

          <p className="text-gray-400 mt-3 text-sm leading-6 px-5">
            Stay updated with rewards,
            recharges and VIP bonuses.
          </p>

        </div>

        {/* NOTIFICATION LIST */}

        <div className="space-y-5">

          {notifications.map(
            (item, index) => (

              <div
                key={index}
                className={`relative rounded-[34px] p-[1.5px] bg-gradient-to-r ${item.color} shadow-[0_0_30px_rgba(255,255,255,0.06)] hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 overflow-hidden`}
              >

                <div className="bg-zinc-900 rounded-[34px] p-5 relative overflow-hidden">

                  {/* SHINE */}

                  <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.08),transparent)] translate-x-[-200%] animate-[shine_7s_linear_infinite]">
                  </div>

                  <div className={`absolute top-0 right-0 w-40 h-40 rounded-full bg-gradient-to-r ${item.color} blur-3xl opacity-10`}>
                  </div>

                  <div className="relative z-10 flex items-start gap-4">

                    {/* ICON */}

                    <div className={`min-w-[64px] h-16 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center text-3xl shadow-[0_0_25px_rgba(255,255,255,0.15)]`}>

                      {item.icon}

                    </div>

                    {/* CONTENT */}

                    <div className="flex-1">

                      <div className="flex items-center justify-between gap-3">

                        <h2 className="text-xl font-black leading-6">

                          {item.title}

                        </h2>

                        <div className="w-2 h-2 rounded-full bg-green-400 animate-ping">
                        </div>

                      </div>

                      <p className="text-gray-400 text-sm mt-3 leading-6">

                        {item.message}

                      </p>

                      <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">

                        <span className="text-gray-500 text-xs">
                          🕒
                        </span>

                        <p className="text-gray-400 text-xs font-bold tracking-widest">

                          {item.time}

                        </p>

                      </div>

                    </div>

                  </div>

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