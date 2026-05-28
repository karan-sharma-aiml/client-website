"use client";

import {
  useEffect,
  useState,
} from "react";

import BottomNav from "../components/BottomNav";

export default function HomePage() {

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [activeVip, setActiveVip] =
    useState("");

  /* =========================
     FETCH USER
  ========================= */

  const fetchLatestUser =
    async () => {

      try {

        const storedUser =
          localStorage.getItem(
            "user"
          );

        if (!storedUser) {

          window.location.href =
            "/login";

          return;

        }

        const parsedUser =
          JSON.parse(
            storedUser
          );

        if (!parsedUser?._id) {

          localStorage.removeItem(
            "user"
          );

          window.location.href =
            "/login";

          return;

        }

        const response =
          await fetch(

            `http://localhost:5000/api/user/balance/${parsedUser._id}`,

            {

              cache:
                "no-store",

            }

          );

        const data =
          await response.json();

        if (data.success) {

          const latestUser =
            data.user;

          setUser(
            latestUser
          );

          setActiveVip(

            latestUser
              ?.activePlan &&

            latestUser.activePlan !==
              "No Plan"

              ? latestUser.activePlan

              : "No Active VIP"

          );

          localStorage.setItem(

            "user",

            JSON.stringify(
              latestUser
            )

          );

        }

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  /* =========================
     LOAD
  ========================= */

  useEffect(() => {

    let mounted = true;

    const loadData =
      async () => {

        if (!mounted)
          return;

        setRefreshing(true);

        await fetchLatestUser();

        setRefreshing(false);

      };

    loadData();

    const interval =
      setInterval(() => {

        loadData();

      }, 5000);

    return () => {

      mounted = false;

      clearInterval(
        interval
      );

    };

  }, []);

  /* =========================
     LOGOUT
  ========================= */

  const logoutUser =
    () => {

      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "user"
      );

      alert(
        "Logged Out"
      );

      window.location.href =
        "/login";

    };

  /* =========================
     LOADING
  ========================= */

  if (
    loading ||
    !user
  ) {

    return (

      <div className="min-h-screen bg-black flex items-center justify-center text-white">

        <div className="text-center">

          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto">
          </div>

          <p className="mt-5 text-xl font-black">

            Loading Luxora...

          </p>

        </div>

      </div>

    );

  }

  /* =========================
     ACTIONS
  ========================= */

  const actions = [

    {
      name: "Recharge",
      icon: "💰",
      link: "/recharge",
      color:
        "from-red-500 to-pink-500",
    },

    {
      name: "Withdraw",
      icon: "🏦",
      link: "/withdraw",
      color:
        "from-green-500 to-emerald-500",
    },

    {
      name: "VIP Plans",
      icon: "💎",
      link: "/vip",
      color:
        "from-yellow-500 to-orange-500",
    },

    {
      name: "Income",
      icon: "📈",
      link: "/income",
      color:
        "from-cyan-500 to-blue-500",
    },

    {
      name: "History",
      icon: "📜",
      link: "/history",
      color:
        "from-violet-500 to-purple-500",
    },

    {
      name: "Team",
      icon: "👥",
      link: "/team",
      color:
        "from-sky-500 to-indigo-500",
    },

    {
      name: "Support",
      icon: "🎧",
      link: "/support",
      color:
        "from-orange-500 to-red-500",
    },

    {
      name: "Profile",
      icon: "🧑",
      link: "/profile",
      color:
        "from-lime-500 to-green-500",
    },

  ];

  return (

    <div className="min-h-screen bg-black text-white px-4 py-6 pb-32 overflow-hidden relative">

      {/* BACKGROUND */}

      <div className="absolute top-0 left-[-100px] w-80 h-80 bg-pink-500/10 rounded-full blur-3xl">
      </div>

      <div className="absolute top-[35%] right-[-120px] w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl">
      </div>

      <div className="absolute bottom-0 left-[10%] w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl">
      </div>

      <div className="max-w-md mx-auto relative z-10">

        {/* HEADER */}

        <div className="flex items-center justify-between mb-8">

          <div>

            <p className="text-gray-400 text-sm">

              Welcome Back 👋

            </p>

            <h1 className="text-3xl font-black mt-1 break-all">

              {user.phone}

            </h1>

          </div>

          <a href="/vip">

            <div className="relative">

              <div className="absolute inset-0 bg-yellow-500 blur-2xl opacity-40 rounded-full">
              </div>

              <div className="relative w-16 h-16 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(250,204,21,0.5)] animate-pulse">

                💎

              </div>

            </div>

          </a>

        </div>

        {/* VIP STATUS */}

        <div className="mb-6 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/20 rounded-[30px] p-4 backdrop-blur-xl">

          <div className="flex items-center justify-between gap-4">

            <div>

              <p className="text-gray-300 text-sm">

                Active VIP Plan

              </p>

              <h2 className="text-3xl font-black text-yellow-400 mt-1 break-all">

                {activeVip}

              </h2>

            </div>

            <a
              href="/vip"
              className="bg-gradient-to-r from-yellow-500 to-orange-500 px-5 py-3 rounded-2xl text-sm font-black hover:scale-105 transition-all duration-300"
            >

              Upgrade

            </a>

          </div>

          <div className="mt-4 flex items-center gap-3 flex-wrap">

            <div className="bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-2xl text-xs font-bold text-green-400">

              VIP STATUS LIVE

            </div>

            <div className="bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-2xl text-xs font-bold text-cyan-400">

              AUTO SYNC ENABLED

            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/20 px-4 py-2 rounded-2xl text-xs font-bold text-yellow-400">

              WALLET SECURED

            </div>

          </div>

        </div>

        {/* BALANCE CARD */}

        <div className="relative bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500 rounded-[40px] p-[1.5px] shadow-[0_0_60px_rgba(168,85,247,0.35)] overflow-hidden">

          <div className="bg-zinc-900 rounded-[40px] p-6 relative overflow-hidden">

            <div className="absolute -top-20 -right-10 w-60 h-60 bg-white/10 rounded-full blur-3xl">
            </div>

            <div className="absolute bottom-0 left-0 w-52 h-52 bg-violet-500/10 rounded-full blur-3xl">
            </div>

            <div className="relative z-10">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-400 text-sm uppercase tracking-[3px]">

                    Total Wallet Balance

                  </p>

                  <h2 className="text-5xl font-black mt-4 text-white">

                    ₹
                    {Number(
                      user.balance || 0
                    ).toLocaleString()}

                  </h2>

                </div>

                <div className="text-7xl opacity-20 animate-bounce">

                  💸

                </div>

              </div>

              {/* STATS */}

              <div className="grid grid-cols-2 gap-4 mt-7">

                <div className="bg-black/40 border border-white/10 rounded-3xl p-4 backdrop-blur-xl">

                  <p className="text-gray-400 text-xs uppercase tracking-widest">

                    VIP Level

                  </p>

                  <h3 className="text-2xl font-black mt-2 text-yellow-400">

                    VIP
                    {" "}
                    {user.vipLevel || 0}

                  </h3>

                </div>

                <div className="bg-black/40 border border-white/10 rounded-3xl p-4 backdrop-blur-xl">

                  <p className="text-gray-400 text-xs uppercase tracking-widest">

                    Total Income

                  </p>

                  <h3 className="text-2xl font-black mt-2 text-green-400">

                    ₹
                    {Number(
                      user.totalIncome || 0
                    ).toLocaleString()}

                  </h3>

                </div>

              </div>

              {/* EXTRA STATS */}

              <div className="grid grid-cols-3 gap-3 mt-5">

                <div className="bg-black/40 rounded-3xl p-3 border border-white/10 text-center">

                  <p className="text-gray-400 text-[10px]">

                    ACTIVE VIP

                  </p>

                  <h3 className="text-lg font-black text-yellow-400 mt-1">

                    {user.activePlan || "None"}

                  </h3>

                </div>

                <div className="bg-black/40 rounded-3xl p-3 border border-white/10 text-center">

                  <p className="text-gray-400 text-[10px]">

                    RECHARGE

                  </p>

                  <h3 className="text-lg font-black text-cyan-400 mt-1">

                    ₹
                    {Number(
                      user.totalRecharge || 0
                    ).toLocaleString()}

                  </h3>

                </div>

                <div className="bg-black/40 rounded-3xl p-3 border border-white/10 text-center">

                  <p className="text-gray-400 text-[10px]">

                    WITHDRAW

                  </p>

                  <h3 className="text-lg font-black text-pink-400 mt-1">

                    ₹
                    {Number(
                      user.totalWithdraw || 0
                    ).toLocaleString()}

                  </h3>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* LIVE NOTICE */}

        <div className="mt-6 bg-zinc-900 border border-white/10 rounded-3xl p-4 overflow-hidden">

          <marquee
            scrollamount="5"
            className="text-yellow-400 text-sm font-bold"
          >

            🔥 VIP Income Active • Recharge Auto Sync • Withdraw Refund Instant • Secure Wallet System • Premium Earnings Enabled • Luxora Live Running Successfully

          </marquee>

        </div>

        {/* QUICK ACTIONS */}

        <div className="grid grid-cols-4 gap-4 mt-8">

          {

            actions.map(

              (
                item,
                index
              ) => (

                <a
                  href={item.link}
                  key={index}
                >

                  <div className={`bg-gradient-to-r ${item.color} rounded-[30px] p-[1.5px] hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl`}>

                    <div className="bg-zinc-900 rounded-[30px] py-5 px-2 flex flex-col items-center justify-center min-h-[110px]">

                      <div className="text-3xl">

                        {item.icon}

                      </div>

                      <p className="text-xs font-black mt-3 text-center leading-4">

                        {item.name}

                      </p>

                    </div>

                  </div>

                </a>

              )

            )

          }

        </div>

        {/* REFRESH STATUS */}

        <div className="mt-5 text-center">

          <p className="text-xs text-gray-500">

            {
              refreshing
                ? "Syncing Wallet..."
                : "Wallet Synced Successfully"
            }

          </p>

        </div>

        {/* LOGOUT */}

        <button
          onClick={logoutUser}
          className="w-full mt-8 bg-gradient-to-r from-red-600 to-pink-500 py-4 rounded-3xl font-black text-lg hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_35px_rgba(239,68,68,0.35)]"
        >

          LOGOUT

        </button>

      </div>

      <BottomNav />

    </div>

  );

}