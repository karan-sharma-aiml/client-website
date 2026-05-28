"use client";

import {
  useEffect,
  useState,
} from "react";

import BottomNav from "../../components/BottomNav";

export default function IncomePage() {

  const [user, setUser] =
    useState(null);

  const [vipHistory, setVipHistory] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  /* =========================
     LOAD DATA
  ========================= */

  const loadData =
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

        /* USER FETCH */

        const userResponse =
          await fetch(

            `http://localhost:5000/api/user/balance/${parsedUser._id}`,

            {

              cache:
                "no-store",

            }

          );

        const userData =
          await userResponse.json();

        if (userData.success) {

          setUser(
            userData.user
          );

          localStorage.setItem(

            "user",

            JSON.stringify(
              userData.user
            )

          );

        }

        /* VIP HISTORY */

        const response =
          await fetch(

            `http://localhost:5000/api/vip/history/${parsedUser._id}`

          );

        const data =
          await response.json();

        if (data.success) {

          setVipHistory(
            data.history
          );

        }

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

        setRefreshing(false);

      }

    };

  /* =========================
     INITIAL LOAD
  ========================= */

  useEffect(() => {

    loadData();

  }, []);

  /* =========================
     LOADING
  ========================= */

  if (loading) {

    return (

      <div className="min-h-screen bg-black flex items-center justify-center text-white">

        <div className="text-center">

          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto">
          </div>

          <p className="mt-5 text-2xl font-black">

            Loading Income...

          </p>

        </div>

      </div>

    );

  }

  /* =========================
     CALCULATIONS
  ========================= */

  const totalPurchased =

    vipHistory.reduce(

      (acc, item) =>

        acc +
        Number(
          item.price || 0
        ),

      0

    );

  const totalExpectedIncome =

    vipHistory.reduce(

      (acc, item) =>

        acc +

        (
          Number(
            item.dailyIncome || 0
          ) *

          Number(
            item.totalDays || 0
          )
        ),

      0

    );

  const activePlans =

    vipHistory.filter(

      (item) =>

        item.status ===
        "active"

    ).length;

  return (

    <div className="min-h-screen bg-black text-white px-4 py-6 pb-28 overflow-hidden relative">

      {/* BACKGROUND */}

      <div className="absolute top-0 left-[-100px] w-80 h-80 bg-pink-500/10 rounded-full blur-3xl">
      </div>

      <div className="absolute top-[40%] right-[-100px] w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl">
      </div>

      <div className="absolute bottom-0 left-[20%] w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl">
      </div>

      <div className="max-w-md mx-auto relative z-10">

        {/* =========================
            HEADER
        ========================= */}

        <div className="text-center mb-8">

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20">

            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping">
            </div>

            <p className="text-cyan-400 font-bold text-xs tracking-[4px]">

              LUXORA INCOME

            </p>

          </div>

          <h1 className="text-5xl font-black mt-5 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500">

            Income Center

          </h1>

          <p className="text-gray-400 mt-3 text-sm">

            VIP Earnings & Investment Analytics

          </p>

        </div>

        {/* =========================
            TOP CARD
        ========================= */}

        <div className="relative bg-gradient-to-r from-green-500 via-cyan-500 to-blue-500 rounded-[38px] p-[1.5px] shadow-[0_0_50px_rgba(34,211,238,0.25)]">

          <div className="bg-zinc-900 rounded-[38px] p-6 relative overflow-hidden">

            <div className="absolute -top-16 -right-10 w-52 h-52 bg-white/10 rounded-full blur-3xl">
            </div>

            <div className="absolute bottom-0 left-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl">
            </div>

            <div className="relative z-10">

              <p className="text-gray-400 text-sm uppercase tracking-[3px]">

                Total VIP Income

              </p>

              <h2 className="text-5xl font-black mt-4 text-green-400">

                ₹
                {

                  Number(
                    user?.totalVipIncome || 0
                  ).toLocaleString()

                }

              </h2>

              <div className="grid grid-cols-3 gap-3 mt-7">

                <div className="bg-black/40 rounded-3xl p-3 border border-white/10 text-center">

                  <p className="text-gray-400 text-[10px]">

                    ACTIVE

                  </p>

                  <h3 className="text-xl font-black mt-1 text-yellow-400">

                    {activePlans}

                  </h3>

                </div>

                <div className="bg-black/40 rounded-3xl p-3 border border-white/10 text-center">

                  <p className="text-gray-400 text-[10px]">

                    TOTAL VIP

                  </p>

                  <h3 className="text-xl font-black mt-1 text-cyan-400">

                    {
                      vipHistory.length
                    }

                  </h3>

                </div>

                <div className="bg-black/40 rounded-3xl p-3 border border-white/10 text-center">

                  <p className="text-gray-400 text-[10px]">

                    LEVEL

                  </p>

                  <h3 className="text-xl font-black mt-1 text-pink-400">

                    VIP
                    {" "}
                    {
                      user?.vipLevel || 0
                    }

                  </h3>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* =========================
            ANALYTICS
        ========================= */}

        <div className="grid grid-cols-2 gap-4 mt-6">

          <div className="bg-zinc-900 border border-white/10 rounded-3xl p-5">

            <p className="text-gray-400 text-xs uppercase">

              Total Invested

            </p>

            <h2 className="text-3xl font-black mt-3 text-white">

              ₹
              {

                Number(
                  totalPurchased
                ).toLocaleString()

              }

            </h2>

          </div>

          <div className="bg-zinc-900 border border-white/10 rounded-3xl p-5">

            <p className="text-gray-400 text-xs uppercase">

              Expected Return

            </p>

            <h2 className="text-3xl font-black mt-3 text-yellow-400">

              ₹
              {

                Number(
                  totalExpectedIncome
                ).toLocaleString()

              }

            </h2>

          </div>

        </div>

        {/* =========================
            LIVE NOTICE
        ========================= */}

        <div className="mt-6 bg-zinc-900 border border-white/10 rounded-3xl p-4 overflow-hidden">

          <marquee
            scrollamount="5"
            className="text-green-400 text-sm font-bold"
          >

            🔥 Daily VIP Income Running • Active VIP Rewards • Smart Wallet System • Income Tracking Enabled • Luxora Premium Analytics Live

          </marquee>

        </div>

        {/* =========================
            VIP HISTORY
        ========================= */}

        <div className="mt-7 bg-zinc-900 border border-white/10 rounded-[36px] p-5">

          <div className="flex items-center justify-between mb-5">

            <h2 className="text-2xl font-black">

              VIP History

            </h2>

            <div className="px-4 py-2 rounded-2xl bg-black/40 border border-white/10 text-sm font-bold text-cyan-400">

              {vipHistory.length} Plans

            </div>

          </div>

          {

            vipHistory.length === 0 ? (

              <div className="bg-black/40 rounded-3xl p-8 text-center border border-white/10">

                <div className="text-6xl mb-4">

                  💎

                </div>

                <h3 className="text-2xl font-black">

                  No VIP Purchased

                </h3>

                <p className="text-gray-400 mt-3 text-sm">

                  Buy a VIP plan to start earning daily income.

                </p>

                <a href="/vip">

                  <button className="mt-5 bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-3 rounded-2xl font-black hover:scale-105 transition-all duration-300">

                    Buy VIP Now

                  </button>

                </a>

              </div>

            ) : (

              <div className="space-y-5">

                {

                  vipHistory.map(
                    (
                      item,
                      index
                    ) => {

                      const totalIncome =

                        Number(
                          item.dailyIncome || 0
                        ) *

                        Number(
                          item.totalDays || 0
                        );

                      const remainingDays =

                        Number(
                          item.remainingDays ||
                          item.totalDays
                        );

                      const progress =

                        Math.min(

                          100,

                          Math.max(

                            0,

                            (

                              (
                                Number(
                                  item.totalDays
                                ) -

                                remainingDays

                              ) /

                              Number(
                                item.totalDays
                              )

                            ) * 100

                          )

                        );

                      return (

                        <div
                          key={item._id || index}
                          className="bg-black/40 border border-white/10 rounded-3xl p-5"
                        >

                          {/* TOP */}

                          <div className="flex items-center justify-between">

                            <div>

                              <h3 className="text-3xl font-black text-yellow-400">

                                {item.vipName}

                              </h3>

                              <p className="text-gray-400 text-sm mt-2">

                                Daily Income Active

                              </p>

                            </div>

                            <div className="text-5xl opacity-20">

                              🚀

                            </div>

                          </div>

                          {/* GRID */}

                          <div className="grid grid-cols-2 gap-4 mt-6">

                            <div className="bg-zinc-900 rounded-3xl p-4 border border-white/10">

                              <p className="text-gray-400 text-xs uppercase">

                                Invested

                              </p>

                              <h4 className="text-2xl font-black mt-2 text-white">

                                ₹
                                {

                                  Number(
                                    item.price || 0
                                  ).toLocaleString()

                                }

                              </h4>

                            </div>

                            <div className="bg-zinc-900 rounded-3xl p-4 border border-green-400/10">

                              <p className="text-gray-400 text-xs uppercase">

                                Daily Income

                              </p>

                              <h4 className="text-2xl font-black mt-2 text-green-400">

                                ₹
                                {

                                  Number(
                                    item.dailyIncome || 0
                                  ).toLocaleString()

                                }

                              </h4>

                            </div>

                            <div className="bg-zinc-900 rounded-3xl p-4 border border-cyan-400/10">

                              <p className="text-gray-400 text-xs uppercase">

                                Remaining Days

                              </p>

                              <h4 className="text-2xl font-black mt-2 text-cyan-400">

                                {remainingDays}

                              </h4>

                            </div>

                            <div className="bg-zinc-900 rounded-3xl p-4 border border-yellow-400/10">

                              <p className="text-gray-400 text-xs uppercase">

                                Total Return

                              </p>

                              <h4 className="text-2xl font-black mt-2 text-yellow-400">

                                ₹
                                {

                                  Number(
                                    totalIncome
                                  ).toLocaleString()

                                }

                              </h4>

                            </div>

                          </div>

                          {/* PROGRESS */}

                          <div className="mt-5">

                            <div className="flex items-center justify-between mb-2">

                              <p className="text-gray-400 text-xs uppercase">

                                Income Progress

                              </p>

                              <p className="text-xs text-cyan-400 font-bold">

                                {progress.toFixed(0)}%

                              </p>

                            </div>

                            <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">

                              <div
                                style={{
                                  width: `${progress}%`,
                                }}
                                className="h-full bg-gradient-to-r from-cyan-400 to-green-400 rounded-full"
                              >
                              </div>

                            </div>

                          </div>

                          {/* FOOTER */}

                          <div className="mt-5 bg-zinc-900 rounded-3xl p-4 border border-white/10 flex items-center justify-between">

                            <div>

                              <p className="text-gray-400 text-xs uppercase">

                                Purchase Date

                              </p>

                              <h4 className="text-lg font-black mt-1">

                                {

                                  new Date(
                                    item.createdAt
                                  ).toLocaleDateString()

                                }

                              </h4>

                            </div>

                            <div className={`px-4 py-2 rounded-2xl text-sm font-black ${
                              item.status === "active"
                                ? "bg-green-500/10 border border-green-400/20 text-green-400"
                                : "bg-red-500/10 border border-red-400/20 text-red-400"
                            }`}>

                              {

                                item.status === "active"
                                  ? "ACTIVE"
                                  : "EXPIRED"

                              }

                            </div>

                          </div>

                        </div>

                      );

                    }

                  )

                }

              </div>

            )

          }

        </div>

        {/* REFRESH */}

        <div className="text-center mt-6">

          <button

            onClick={() => {

              setRefreshing(
                true
              );

              loadData();

            }}

            className="bg-zinc-900 border border-white/10 px-6 py-3 rounded-2xl text-sm font-black hover:scale-105 transition-all duration-300"

          >

            {

              refreshing
                ? "Refreshing..."
                : "Refresh Income"

            }

          </button>

        </div>

      </div>

      <BottomNav />

    </div>

  );

}