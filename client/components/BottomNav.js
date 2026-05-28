"use client";

import Link from "next/link";

import {
  usePathname,
} from "next/navigation";

export default function BottomNav() {

  const pathname =
    usePathname();

  /* =========================
     NAV ITEMS
  ========================= */

  const navItems = [

    {
      name: "Home",
      icon: "🏠",
      path: "/",
      glow:
        "from-cyan-500 to-blue-500",
    },

    {
      name: "Recharge",
      icon: "💰",
      path: "/recharge",
      glow:
        "from-pink-500 to-red-500",
    },

    {
      name: "VIP",
      icon: "💎",
      path: "/vip",
      glow:
        "from-yellow-500 to-orange-500",
      special: true,
    },

    {
      name: "Withdraw",
      icon: "🏦",
      path: "/withdraw",
      glow:
        "from-green-500 to-emerald-500",
    },

    {
      name: "Profile",
      icon: "👑",
      path: "/profile",
      glow:
        "from-violet-500 to-purple-500",
    },

  ];

  return (

    <div className="fixed bottom-0 left-0 w-full z-50 px-3 pb-3">

      {/* =========================
          OUTER GLOW
      ========================= */}

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none">
      </div>

      {/* =========================
          MAIN NAV
      ========================= */}

      <div className="max-w-md mx-auto relative">

        {/* BLUR BG */}

        <div className="absolute inset-0 bg-black/50 backdrop-blur-3xl rounded-[36px] border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.08)]">
        </div>

        {/* TOP SHINE */}

        <div className="absolute top-0 left-[10%] w-[80%] h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent">
        </div>

        {/* NAV CONTENT */}

        <div className="relative z-10 flex items-center justify-between px-2 py-3">

          {

            navItems.map(
              (
                item,
                index
              ) => {

                const isActive =

                  pathname ===
                  item.path;

                return (

                  <Link
                    key={index}
                    href={item.path}
                    className="relative"
                  >

                    {/* VIP SPECIAL */}

                    {

                      item.special ? (

                        <div className="relative -mt-10">

                          {/* GLOW */}

                          <div className={`absolute inset-0 bg-gradient-to-r ${item.glow} blur-2xl opacity-60 rounded-full`}>
                          </div>

                          {/* BUTTON */}

                          <div className={`relative w-[74px] h-[74px] rounded-full bg-gradient-to-r ${item.glow} p-[2px] shadow-[0_0_35px_rgba(255,255,255,0.25)] transition-all duration-300 ${

                            isActive
                              ? "scale-110"
                              : "scale-100"

                          }`}>

                            <div className="w-full h-full rounded-full bg-zinc-900 flex flex-col items-center justify-center">

                              <div className={`text-3xl ${

                                isActive
                                  ? "animate-pulse"
                                  : ""

                              }`}>

                                {item.icon}

                              </div>

                              <p className="text-[10px] font-black mt-1 text-yellow-400">

                                {item.name}

                              </p>

                            </div>

                          </div>

                        </div>

                      ) : (

                        <div className={`relative flex flex-col items-center justify-center px-3 py-2 rounded-3xl transition-all duration-300 min-w-[65px]

                        ${

                          isActive

                            ? `bg-gradient-to-r ${item.glow} text-white shadow-[0_0_30px_rgba(255,255,255,0.15)] scale-105`

                            : "text-gray-400 hover:text-white hover:bg-white/5"

                        }`}>

                          {/* ACTIVE GLOW */}

                          {

                            isActive && (

                              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${item.glow} opacity-20 blur-xl`}>
                              </div>

                            )

                          }

                          {/* ICON */}

                          <div className={`relative z-10 text-2xl transition-all duration-300 ${

                            isActive
                              ? "scale-110"
                              : "scale-100"

                          }`}>

                            {item.icon}

                          </div>

                          {/* TEXT */}

                          <p className={`relative z-10 text-[11px] mt-1 font-black tracking-wide ${

                            isActive
                              ? "text-white"
                              : "text-gray-400"

                          }`}>

                            {item.name}

                          </p>

                        </div>

                      )

                    }

                  </Link>

                );

              }

            )

          }

        </div>

      </div>

    </div>

  );

}