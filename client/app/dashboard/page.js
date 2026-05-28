"use client";

import {
  useEffect,
  useMemo,
} from "react";

import useAuth from "../../hooks/useAuth";
import useUser from "../../hooks/useUser";

import Loader from "../../components/Loader";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import WalletCard from "../../components/WalletCard";
import ActionGrid from "../../components/ActionGrid";

export default function HomePage() {

  /* =========================
     AUTH
  ========================= */

  useAuth();

  /* =========================
     USER
  ========================= */

  const {
    user,
    loading,
    refreshUser,
  } = useUser();

  /* =========================
     AUTO REFRESH
  ========================= */

  useEffect(() => {

    const interval =
      setInterval(() => {

        refreshUser?.();

      }, 30000);

    return () =>
      clearInterval(interval);

  }, [refreshUser]);

  /* =========================
     LOADING
  ========================= */

  if (
    loading ||
    !user
  ) {

    return <Loader />;

  }

  /* =========================
     FORMAT VALUES
  ========================= */

  const balance =
    Number(
      user.balance || 0
    ).toLocaleString();

  const income =
    Number(
      user.totalIncome || 0
    ).toLocaleString();

  const recharge =
    Number(
      user.totalRecharge || 0
    ).toLocaleString();

  const withdraw =
    Number(
      user.totalWithdraw || 0
    ).toLocaleString();

  const vipLevel =
    user.vipLevel || 0;

  const activePlan =
    user.activePlan ||
    "No VIP";

  /* =========================
     STATS
  ========================= */

  const stats = useMemo(
    () => [

      {
        title: "Income",
        value: `₹${income}`,
        color:
          "text-green-400",
      },

      {
        title: "Recharge",
        value: `₹${recharge}`,
        color:
          "text-cyan-400",
      },

      {
        title: "Withdraw",
        value: `₹${withdraw}`,
        color:
          "text-pink-400",
      },

    ],
    [
      income,
      recharge,
      withdraw,
    ]
  );

  return (

    <div className="min-h-screen bg-black text-white px-4 py-6 pb-32 overflow-hidden relative">

      {/* =========================
          BACKGROUND
      ========================= */}

      <div className="absolute top-0 left-[-120px] w-80 h-80 bg-pink-500/10 rounded-full blur-3xl">
      </div>

      <div className="absolute top-[35%] right-[-120px] w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl">
      </div>

      <div className="absolute bottom-0 left-[10%] w-80 h-80 bg-violet-500/10 rounded-full blur-3xl">
      </div>

      {/* =========================
          CONTENT
      ========================= */}

      <div className="max-w-md mx-auto relative z-10">

        {/* =========================
            HEADER
        ========================= */}

        <Header
          phone={user.phone}
        />

        {/* =========================
            VIP STATUS
        ========================= */}

        <div className="mt-6 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/20 rounded-[32px] p-5 backdrop-blur-xl overflow-hidden relative">

          <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-400/10 rounded-full blur-3xl">
          </div>

          <div className="relative z-10 flex items-center justify-between gap-4">

            <div>

              <p className="text-gray-300 text-sm">

                Active VIP Plan

              </p>

              <h2 className="text-3xl font-black text-yellow-400 mt-2 break-all">

                {activePlan}

              </h2>

            </div>

            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center text-3xl shadow-[0_0_35px_rgba(250,204,21,0.35)] animate-pulse">

              💎

            </div>

          </div>

          <div className="flex gap-3 flex-wrap mt-5">

            <div className="bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-2xl text-xs font-black text-green-400">

              WALLET SECURED

            </div>

            <div className="bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-2xl text-xs font-black text-cyan-400">

              LIVE SYNC

            </div>

            <div className="bg-pink-500/10 border border-pink-500/20 px-4 py-2 rounded-2xl text-xs font-black text-pink-400">

              VIP LEVEL {vipLevel}

            </div>

          </div>

        </div>

        {/* =========================
            WALLET CARD
        ========================= */}

        <div className="mt-7">

          <WalletCard user={user} />

        </div>

        {/* =========================
            QUICK ACTIONS
        ========================= */}

        <div className="mt-8">

          <ActionGrid />

        </div>

        {/* =========================
            STATS
        ========================= */}

        <div className="grid grid-cols-3 gap-3 mt-8">

          {
            stats.map(
              (
                item,
                index
              ) => (

                <div
                  key={index}
                  className="bg-zinc-900 border border-white/10 rounded-[28px] p-4 text-center shadow-[0_0_20px_rgba(255,255,255,0.03)]"
                >

                  <p className="text-gray-400 text-[11px] uppercase tracking-[2px]">

                    {item.title}

                  </p>

                  <h2 className={`text-lg font-black mt-3 ${item.color}`}>

                    {item.value}

                  </h2>

                </div>

              )
            )
          }

        </div>

        {/* =========================
            LIVE STATUS
        ========================= */}

        <div className="mt-8 bg-zinc-900 border border-white/10 rounded-[32px] p-5 overflow-hidden relative">

          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-cyan-500/5 to-violet-500/5">
          </div>

          <div className="relative z-10 flex items-center justify-between gap-4">

            <div>

              <p className="text-gray-400 text-sm">

                Platform Status

              </p>

              <h3 className="text-green-400 font-black text-2xl mt-2">

                LIVE & RUNNING

              </h3>

              <p className="text-gray-500 text-xs mt-2 leading-5">

                Wallet sync, VIP income,
                recharge & withdraw systems
                are running successfully.

              </p>

            </div>

            <div className="flex flex-col items-center">

              <div className="w-4 h-4 rounded-full bg-green-400 animate-ping">
              </div>

              <p className="text-green-400 text-xs font-black mt-3">

                ONLINE

              </p>

            </div>

          </div>

        </div>

        {/* =========================
            MARQUEE NOTICE
        ========================= */}

        <div className="mt-7 bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden py-4 px-2">

          <marquee
            scrollamount="5"
            className="text-yellow-400 text-sm font-black"
          >

            🔥 VIP Income Active • Instant Recharge Sync • Secure Wallet System • Withdraw Processing Live • Premium Earnings Enabled • Luxora Running Successfully

          </marquee>

        </div>

        {/* =========================
            BALANCE CARD
        ========================= */}

        <div className="mt-7 bg-gradient-to-r from-violet-600 via-purple-500 to-pink-500 rounded-[34px] p-[1.5px] shadow-[0_0_50px_rgba(168,85,247,0.35)]">

          <div className="bg-zinc-900 rounded-[34px] p-6 relative overflow-hidden">

            <div className="absolute -top-16 -right-8 w-44 h-44 bg-white/10 rounded-full blur-3xl">
            </div>

            <div className="relative z-10">

              <p className="text-gray-400 text-sm tracking-[3px] uppercase">

                Available Balance

              </p>

              <h2 className="text-5xl font-black mt-4">

                ₹{balance}

              </h2>

              <div className="flex items-center justify-between mt-6">

                <div>

                  <p className="text-gray-500 text-xs">

                    Wallet ID

                  </p>

                  <h3 className="font-black mt-1">

                    #{user._id?.slice(-8)}

                  </h3>

                </div>

                <div className="text-6xl opacity-20 animate-bounce">

                  💸

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* =========================
          BOTTOM NAV
      ========================= */}

      <BottomNav />

    </div>

  );

} 