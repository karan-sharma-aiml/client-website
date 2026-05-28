"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import BottomNav from "../../components/BottomNav";

export default function HistoryPage() {

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [activeTab, setActiveTab] =
    useState("all");

  const [rechargeHistory, setRechargeHistory] =
    useState([]);

  const [withdrawHistory, setWithdrawHistory] =
    useState([]);

  const [vipHistory, setVipHistory] =
    useState([]);

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

        setUser(
          parsedUser
        );

        /* RECHARGE */

        const rechargeRes =
          await fetch(

            `http://localhost:5000/api/recharge/history/${parsedUser._id}`

          );

        const rechargeData =
          await rechargeRes.json();

        if (rechargeData.success) {

          setRechargeHistory(

            rechargeData.recharges || []

          );

        }

        /* WITHDRAW */

        const withdrawRes =
          await fetch(

            `http://localhost:5000/api/withdraw/history/${parsedUser._id}`

          );

        const withdrawData =
          await withdrawRes.json();

        if (withdrawData.success) {

          setWithdrawHistory(

            withdrawData.withdraws || []

          );

        }

        /* VIP */

        const vipRes =
          await fetch(

            `http://localhost:5000/api/vip/history/${parsedUser._id}`

          );

        const vipData =
          await vipRes.json();

        if (vipData.success) {

          setVipHistory(
            vipData.history || []
          );

        }

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

        setRefreshing(false);

      }

    };

  useEffect(() => {

    loadData();

  }, []);

  /* =========================
     STATUS COLOR
  ========================= */

  const getStatusColor =
    (status) => {

      const lower =
        String(
          status
        ).toLowerCase();

      if (
        lower === "success" ||
        lower === "approved" ||
        lower === "active" ||
        lower === "activated"
      ) {

        return "text-green-400 border-green-500/20 bg-green-500/10";

      }

      if (
        lower === "pending" ||
        lower === "processing"
      ) {

        return "text-yellow-400 border-yellow-500/20 bg-yellow-500/10";

      }

      if (
        lower === "rejected" ||
        lower === "cancelled" ||
        lower === "expired"
      ) {

        return "text-red-400 border-red-500/20 bg-red-500/10";

      }

      return "text-cyan-400 border-cyan-500/20 bg-cyan-500/10";

    };

  /* =========================
     ALL HISTORY
  ========================= */

  const allHistory =
    useMemo(() => {

      const rechargeItems =

        rechargeHistory.map(
          (item) => ({

            ...item,

            historyType:
              "Recharge",

          })

        );

      const withdrawItems =

        withdrawHistory.map(
          (item) => ({

            ...item,

            historyType:
              "Withdraw",

          })

        );

      const vipItems =
        vipHistory.map(
          (item) => ({

            ...item,

            historyType:
              "VIP",

          })

        );

      return [

        ...rechargeItems,

        ...withdrawItems,

        ...vipItems,

      ].sort(

        (
          a,
          b
        ) =>

          new Date(
            b.createdAt
          ) -

          new Date(
            a.createdAt
          )

      );

    }, [

      rechargeHistory,

      withdrawHistory,

      vipHistory,

    ]);

  /* =========================
     FILTERED HISTORY
  ========================= */

  const filteredHistory =
    allHistory.filter(
      (item) => {

        if (
          activeTab ===
          "all"
        ) {

          return true;

        }

        return (

          item.historyType.toLowerCase() ===
          activeTab

        );

      }

    );

  /* =========================
     TOTALS
  ========================= */

  const totalRecharge =

    rechargeHistory.reduce(

      (acc, item) =>

        acc +
        Number(
          item.amount || 0
        ),

      0

    );

  const totalWithdraw =

    withdrawHistory.reduce(

      (acc, item) =>

        acc +
        Number(
          item.amount || 0
        ),

      0

    );

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

            Loading History...

          </p>

        </div>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-black text-white px-4 py-6 pb-28 overflow-hidden relative">

      {/* BG */}

      <div className="absolute top-[-100px] left-[-100px] w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl">
      </div>

      <div className="absolute top-[35%] right-[-100px] w-80 h-80 bg-pink-500/10 rounded-full blur-3xl">
      </div>

      <div className="absolute bottom-[-100px] left-[20%] w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl">
      </div>

      <div className="max-w-md mx-auto relative z-10">

        {/* HEADER */}

        <div className="text-center mb-8">

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20">

            <span className="text-cyan-400">

              ✦

            </span>

            <p className="text-cyan-400 text-xs font-black tracking-[3px]">

              TRANSACTION CENTER

            </p>

          </div>

          <h1 className="text-5xl font-black mt-5 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">

            History

          </h1>

          <p className="text-gray-400 mt-3 text-sm px-5 leading-6">

            Recharge, Withdraw & VIP activities with live wallet tracking.

          </p>

        </div>

        {/* ANALYTICS */}

        <div className="grid grid-cols-2 gap-4">

          <div className="bg-zinc-900 border border-white/10 rounded-3xl p-5">

            <p className="text-gray-400 text-xs uppercase">

              Total Recharge

            </p>

            <h2 className="text-3xl font-black mt-3 text-green-400">

              ₹
              {

                Number(
                  totalRecharge
                ).toLocaleString()

              }

            </h2>

          </div>

          <div className="bg-zinc-900 border border-white/10 rounded-3xl p-5">

            <p className="text-gray-400 text-xs uppercase">

              Total Withdraw

            </p>

            <h2 className="text-3xl font-black mt-3 text-red-400">

              ₹
              {

                Number(
                  totalWithdraw
                ).toLocaleString()

              }

            </h2>

          </div>

        </div>

        {/* LIVE CARD */}

        <div className="mt-6 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-[36px] p-[1.5px] shadow-[0_0_40px_rgba(59,130,246,0.35)]">

          <div className="bg-zinc-900 rounded-[36px] p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-400 text-sm">

                  Total Activities

                </p>

                <h2 className="text-5xl font-black mt-3">

                  {
                    allHistory.length
                  }

                </h2>

              </div>

              <div className="text-7xl opacity-20">

                📊

              </div>

            </div>

            <div className="grid grid-cols-3 gap-3 mt-6">

              <div className="bg-black/40 rounded-3xl p-3 text-center border border-white/10">

                <p className="text-gray-400 text-[10px]">

                  RECHARGE

                </p>

                <h3 className="text-lg font-black text-green-400 mt-1">

                  {
                    rechargeHistory.length
                  }

                </h3>

              </div>

              <div className="bg-black/40 rounded-3xl p-3 text-center border border-white/10">

                <p className="text-gray-400 text-[10px]">

                  WITHDRAW

                </p>

                <h3 className="text-lg font-black text-red-400 mt-1">

                  {
                    withdrawHistory.length
                  }

                </h3>

              </div>

              <div className="bg-black/40 rounded-3xl p-3 text-center border border-white/10">

                <p className="text-gray-400 text-[10px]">

                  VIP

                </p>

                <h3 className="text-lg font-black text-yellow-400 mt-1">

                  {
                    vipHistory.length
                  }

                </h3>

              </div>

            </div>

          </div>

        </div>

        {/* FILTERS */}

        <div className="flex gap-3 overflow-x-auto mt-6 pb-2">

          {

            [

              "all",

              "recharge",

              "withdraw",

              "vip",

            ].map(
              (tab) => (

                <button
                  key={tab}
                  onClick={() =>
                    setActiveTab(
                      tab
                    )
                  }
                  className={`px-5 py-3 rounded-2xl text-sm font-black whitespace-nowrap transition-all duration-300 ${
                    activeTab ===
                    tab
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                      : "bg-zinc-900 border border-white/10 text-gray-300"
                  }`}
                >

                  {
                    tab.toUpperCase()
                  }

                </button>

              )
            )

          }

        </div>

        {/* HISTORY */}

        <div className="mt-6 space-y-5">

          {

            filteredHistory.length === 0 ? (

              <div className="bg-zinc-900 border border-white/10 rounded-[36px] p-10 text-center">

                <div className="text-6xl">

                  📭

                </div>

                <h2 className="text-3xl font-black mt-5">

                  No History Found

                </h2>

                <p className="text-gray-400 mt-3 text-sm">

                  Your transactions will appear here.

                </p>

              </div>

            ) : (

              filteredHistory.map(
                (
                  item,
                  index
                ) => {

                  const isRecharge =

                    item.historyType ===
                    "Recharge";

                  const isWithdraw =

                    item.historyType ===
                    "Withdraw";

                  const isVip =

                    item.historyType ===
                    "VIP";

                  return (

                    <div
                      key={
                        item._id ||
                        index
                      }
                      className="bg-zinc-900 border border-white/10 rounded-[36px] p-5 relative overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.03)]"
                    >

                      {/* GLOW */}

                      <div className={`absolute top-0 right-0 w-44 h-44 rounded-full blur-3xl ${
                        isRecharge
                          ? "bg-green-500/10"
                          : isWithdraw
                          ? "bg-red-500/10"
                          : "bg-yellow-500/10"
                      }`}>
                      </div>

                      <div className="relative z-10">

                        {/* TOP */}

                        <div className="flex items-center justify-between">

                          <div>

                            <div className="flex items-center gap-3">

                              <div className="text-3xl">

                                {

                                  isRecharge
                                    ? "💰"
                                    : isWithdraw
                                    ? "🏦"
                                    : "👑"

                                }

                              </div>

                              <div>

                                <h2 className="text-2xl font-black">

                                  {

                                    isVip
                                      ? item.vipName
                                      : `₹${Number(item.amount || 0).toLocaleString()}`

                                  }

                                </h2>

                                <p className="text-gray-400 text-sm mt-1">

                                  {
                                    item.historyType
                                  }

                                </p>

                              </div>

                            </div>

                          </div>

                          <div className={`px-4 py-2 rounded-full border text-xs font-black tracking-widest ${getStatusColor(item.status)}`}>

                            {

                              String(
                                item.status || "Success"
                              ).toUpperCase()

                            }

                          </div>

                        </div>

                        {/* DETAILS */}

                        <div className="grid grid-cols-2 gap-4 mt-6">

                          <div className="bg-black/40 rounded-3xl p-4 border border-white/10">

                            <p className="text-gray-400 text-xs uppercase">

                              Date

                            </p>

                            <h3 className="text-lg font-black mt-2">

                              {

                                new Date(
                                  item.createdAt
                                ).toLocaleDateString()

                              }

                            </h3>

                          </div>

                          <div className="bg-black/40 rounded-3xl p-4 border border-white/10">

                            <p className="text-gray-400 text-xs uppercase">

                              Transaction ID

                            </p>

                            <h3 className="text-sm font-black mt-2 break-all text-cyan-400">

                              {

                                item.transactionId ||

                                item._id?.slice(-8) ||

                                "N/A"

                              }

                            </h3>

                          </div>

                        </div>

                        {/* VIP DETAILS */}

                        {

                          isVip && (

                            <div className="grid grid-cols-3 gap-3 mt-4">

                              <div className="bg-black/40 rounded-2xl p-3 text-center border border-white/10">

                                <p className="text-gray-400 text-[10px]">

                                  PRICE

                                </p>

                                <h4 className="text-lg font-black mt-1 text-white">

                                  ₹
                                  {

                                    Number(
                                      item.price || 0
                                    ).toLocaleString()

                                  }

                                </h4>

                              </div>

                              <div className="bg-black/40 rounded-2xl p-3 text-center border border-white/10">

                                <p className="text-gray-400 text-[10px]">

                                  DAILY

                                </p>

                                <h4 className="text-lg font-black mt-1 text-green-400">

                                  ₹
                                  {

                                    Number(
                                      item.dailyIncome || 0
                                    ).toLocaleString()

                                  }

                                </h4>

                              </div>

                              <div className="bg-black/40 rounded-2xl p-3 text-center border border-white/10">

                                <p className="text-gray-400 text-[10px]">

                                  DAYS

                                </p>

                                <h4 className="text-lg font-black mt-1 text-cyan-400">

                                  {
                                    item.totalDays || 0
                                  }

                                </h4>

                              </div>

                            </div>

                          )

                        }

                      </div>

                    </div>

                  );

                }

              )

            )

          }

        </div>

        {/* REFRESH */}

        <div className="text-center mt-7">

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
                : "Refresh History"

            }

          </button>

        </div>

      </div>

      <BottomNav />

    </div>

  );

}