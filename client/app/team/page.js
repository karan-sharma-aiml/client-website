"use client";

import BottomNav from "../../components/BottomNav";

export default function TeamPage() {

  const referralCode =
    "LUXORA2026";

  const referralLink =
    `https://luxora.com/register?ref=${referralCode}`;

  const copyCode = () => {

    navigator.clipboard.writeText(
      referralLink
    );

    alert("Referral Link Copied");

  };

  const shareReferral =
    async () => {

      const shareData = {

        title: "Luxora",

        text:
          `🔥 Join Luxora & Earn Daily Income 🚀\n\nReferral Code: ${referralCode}\n\n${referralLink}`,

        url: referralLink,

      };

      try {

        await navigator.share(
          shareData
        );

      } catch (error) {

        console.log(error);

      }

    };

  const stats = [
    {
      title: "Team Members",
      value: "128",
      icon: "👥",
      color:
        "from-cyan-500 to-blue-500",
    },

    {
      title: "Team Income",
      value: "₹12,580",
      icon: "💰",
      color:
        "from-green-500 to-emerald-500",
    },

    {
      title: "VIP Bonus",
      value: "₹8,200",
      icon: "👑",
      color:
        "from-yellow-500 to-orange-500",
    },

    {
      title: "Today's Reward",
      value: "₹850",
      icon: "⚡",
      color:
        "from-pink-500 to-rose-500",
    },
  ];

  const teamUsers = [
    {
      name: "Rahul",
      joined: "VIP 1",
      income: "₹500",
    },

    {
      name: "Aman",
      joined: "VIP 3",
      income: "₹1200",
    },

    {
      name: "Karan",
      joined: "VIP 2",
      income: "₹800",
    },
  ];

  return (

    <div className="min-h-screen bg-black text-white px-4 py-6 pb-28 overflow-hidden relative">

      {/* BACKGROUND LIGHTS */}

      <div className="absolute top-[-100px] left-[-100px] w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse">
      </div>

      <div className="absolute top-[30%] right-[-120px] w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse">
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
              INVITE & EARN
            </p>

          </div>

          <h1 className="text-5xl font-black mt-5 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 drop-shadow-[0_0_30px_rgba(59,130,246,0.45)] animate-pulse">

            My Team

          </h1>

          <p className="text-gray-400 mt-3 text-sm leading-6 px-5">
            Invite friends and earn
            unlimited commissions daily.
          </p>

        </div>

        {/* REFERRAL CARD */}

        <div className="relative rounded-[40px] p-[1.5px] bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 shadow-[0_0_60px_rgba(59,130,246,0.35)] overflow-hidden">

          <div className="bg-zinc-900 rounded-[40px] p-6 relative overflow-hidden">

            {/* SHINE */}

            <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.1),transparent)] translate-x-[-200%] animate-[shine_6s_linear_infinite]">
            </div>

            <div className="absolute -top-20 -right-10 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl">
            </div>

            <div className="absolute bottom-0 left-0 w-44 h-44 bg-blue-500/10 rounded-full blur-3xl">
            </div>

            <div className="relative z-10">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-400 text-xs uppercase tracking-[4px]">
                    Referral Code
                  </p>

                  <h2 className="text-4xl font-black mt-3 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]">

                    {referralCode}

                  </h2>

                </div>

                <div className="text-7xl opacity-20 animate-bounce">
                  🚀
                </div>

              </div>

              <div className="mt-6 bg-black/40 border border-white/10 rounded-3xl p-4 backdrop-blur-xl">

                <p className="text-gray-400 text-xs uppercase tracking-widest">
                  Referral Link
                </p>

                <p className="text-sm mt-2 break-all text-cyan-300">

                  {referralLink}

                </p>

              </div>

              {/* BUTTONS */}

              <button
                onClick={copyCode}
                className="relative overflow-hidden w-full mt-6 bg-gradient-to-r from-cyan-500 to-blue-500 py-4 rounded-3xl font-black text-lg tracking-wide shadow-[0_0_35px_rgba(59,130,246,0.35)] hover:scale-105 active:scale-95 transition-all duration-300"
              >

                <span className="absolute inset-0 opacity-0 hover:opacity-100 transition-all duration-1000 bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.35),transparent)] translate-x-[-200%] hover:translate-x-[200%]">
                </span>

                <span className="relative z-10">

                  COPY INVITE LINK

                </span>

              </button>

              <button
                onClick={shareReferral}
                className="relative overflow-hidden w-full mt-4 bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 py-4 rounded-3xl font-black text-lg tracking-wide shadow-[0_0_35px_rgba(244,63,94,0.35)] hover:scale-105 active:scale-95 transition-all duration-300"
              >

                <span className="absolute inset-0 opacity-0 hover:opacity-100 transition-all duration-1000 bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.35),transparent)] translate-x-[-200%] hover:translate-x-[200%]">
                </span>

                <span className="relative z-10">

                  SHARE NOW 🚀

                </span>

              </button>

            </div>

          </div>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-2 gap-4 mt-7">

          {stats.map((item, index) => (

            <div
              key={index}
              className={`relative rounded-[32px] p-[1.5px] bg-gradient-to-r ${item.color} overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.08)] hover:scale-105 transition-all duration-300`}
            >

              <div className="bg-zinc-900 rounded-[32px] p-4 h-full relative overflow-hidden">

                <div className={`absolute top-0 right-0 w-24 h-24 rounded-full bg-gradient-to-r ${item.color} blur-3xl opacity-20`}>
                </div>

                <div className="relative z-10">

                  <div className="flex items-center justify-between">

                    <div className="text-4xl">
                      {item.icon}
                    </div>

                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${item.color} blur-2xl opacity-40`}>
                    </div>

                  </div>

                  <p className="text-gray-400 text-xs mt-5 uppercase tracking-widest">
                    {item.title}
                  </p>

                  <h3 className="text-3xl font-black mt-2">

                    {item.value}

                  </h3>

                </div>

              </div>

            </div>

          ))}

        </div>

        {/* TEAM MEMBERS */}

        <div className="mt-8 bg-zinc-900 border border-white/10 rounded-[40px] p-5 relative overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.04)]">

          <div className="absolute top-0 right-0 w-52 h-52 bg-pink-500/10 rounded-full blur-3xl">
          </div>

          <div className="relative z-10">

            <div className="flex items-center justify-between mb-6">

              <div>

                <h2 className="text-3xl font-black">
                  Team Members
                </h2>

                <p className="text-gray-400 text-sm mt-1">
                  Your active referrals
                </p>

              </div>

              <div className="text-5xl">
                👥
              </div>

            </div>

            <div className="space-y-4">

              {teamUsers.map(
                (user, index) => (

                  <div
                    key={index}
                    className="bg-black/40 border border-white/10 rounded-3xl p-4 backdrop-blur-xl hover:scale-[1.02] hover:border-cyan-500/30 transition-all duration-300"
                  >

                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-4">

                        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-xl font-black shadow-[0_0_20px_rgba(59,130,246,0.35)]">

                          {user.name.charAt(0)}

                        </div>

                        <div>

                          <h3 className="text-xl font-black">

                            {user.name}

                          </h3>

                          <p className="text-gray-400 text-sm mt-1">

                            {user.joined}

                          </p>

                        </div>

                      </div>

                      <div className="text-right">

                        <p className="text-green-400 text-2xl font-black drop-shadow-[0_0_12px_rgba(74,222,128,0.8)]">

                          {user.income}

                        </p>

                        <p className="text-xs text-gray-500 mt-1 tracking-widest">
                          COMMISSION
                        </p>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

        </div>

      </div>

      <BottomNav />

    </div>

  );
}