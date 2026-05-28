"use client";

import {
  useEffect,
  useState,
} from "react";

import BottomNav from "../../components/BottomNav";

export default function ProfilePage() {

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  /* =========================
     LOAD USER
  ========================= */

  const loadUser =
    async () => {

      try {

        setRefreshing(true);

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

        const response =
          await fetch(

            `https://client-website-3rw8.onrender.com/api/user/balance/${parsedUser._id}`,

            {

              headers: {

                Authorization:
                  `Bearer ${localStorage.getItem("token")}`,

              },

              cache:
                "no-store",

            }

          );

        const data =
          await response.json();

        if (data.success) {

          setUser(
            data.user
          );

          localStorage.setItem(

            "user",

            JSON.stringify(
              data.user
            )

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
     USE EFFECT
  ========================= */

  useEffect(() => {

    loadUser();

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
        "Logged Out Successfully"
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

          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto">
          </div>

          <p className="mt-5 text-xl font-black">

            Loading Profile...

          </p>

        </div>

      </div>

    );

  }

  /* =========================
     TOTAL TEAM
  ========================= */

  const totalTeam =

    Number(
      user.totalTeam || 0
    );

  /* =========================
     ACTIVE VIP
  ========================= */

  const activePlan =

    user.activePlan ||
    "No Active VIP";

  return (

    <div className="min-h-screen bg-black text-white px-4 py-6 pb-32 overflow-hidden relative">

      {/* =========================
          PREMIUM BACKGROUND
      ========================= */}

      <div className="absolute top-[-120px] left-[-100px] w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl animate-pulse">
      </div>

      <div className="absolute top-[30%] right-[-100px] w-80 h-80 bg-pink-500/15 rounded-full blur-3xl animate-pulse">
      </div>

      <div className="absolute bottom-[-100px] left-[20%] w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl animate-pulse">
      </div>

      <div className="max-w-md mx-auto relative z-10">

        {/* =========================
            PROFILE TOP
        ========================= */}

        <div className="text-center">

          <div className="relative inline-block">

            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 blur-2xl opacity-70 animate-pulse">
            </div>

            <div className="relative w-32 h-32 rounded-full p-[3px] bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 shadow-[0_0_45px_rgba(59,130,246,0.5)]">

              <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center text-6xl border border-white/10">

                👑

              </div>

            </div>

            <div className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-green-500 border-4 border-black shadow-[0_0_20px_rgba(34,197,94,0.9)] animate-pulse">
            </div>

          </div>

          <div className="mt-6">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20">

              <span className="text-yellow-400">
                ✦
              </span>

              <p className="text-yellow-400 text-xs tracking-[3px] font-black">

                LUXORA PREMIUM MEMBER

              </p>

            </div>

            <h1 className="text-4xl font-black mt-5 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">

              {user.phone}

            </h1>

            <p className="text-gray-400 mt-2 text-sm">

              Welcome Back To Luxora

            </p>

          </div>

        </div>

        {/* =========================
            WALLET CARD
        ========================= */}

        <div className="relative mt-8 rounded-[38px] p-[1.5px] bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 shadow-[0_0_50px_rgba(59,130,246,0.25)] overflow-hidden">

          <div className="bg-zinc-900 rounded-[38px] p-6 relative overflow-hidden">

            <div className="absolute -top-20 -right-10 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl">
            </div>

            <div className="absolute bottom-0 left-0 w-44 h-44 bg-blue-500/10 rounded-full blur-3xl">
            </div>

            <div className="relative z-10">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-400 text-xs tracking-[3px] uppercase">

                    Total Wallet Balance

                  </p>

                  <h2 className="text-5xl font-black mt-4 text-green-400">

                    ₹
                    {Number(
                      user.balance || 0
                    ).toLocaleString()}

                  </h2>

                </div>

                <div className="text-6xl opacity-20">

                  💰

                </div>

              </div>

              {/* =========================
                  STATS
              ========================= */}

              <div className="grid grid-cols-2 gap-4 mt-6">

                <div className="bg-black/40 border border-white/10 rounded-3xl p-4">

                  <p className="text-gray-400 text-xs uppercase">

                    VIP LEVEL

                  </p>

                  <h3 className="text-3xl font-black mt-2 text-yellow-400">

                    VIP
                    {" "}
                    {user.vipLevel || 0}

                  </h3>

                </div>

                <div className="bg-black/40 border border-white/10 rounded-3xl p-4">

                  <p className="text-gray-400 text-xs uppercase">

                    STATUS

                  </p>

                  <h3 className="text-2xl font-black mt-3 text-green-400">

                    ● ACTIVE

                  </h3>

                </div>

              </div>

              {/* =========================
                  EXTRA STATS
              ========================= */}

              <div className="grid grid-cols-3 gap-3 mt-5">

                <div className="bg-black/40 rounded-3xl p-3 border border-white/10 text-center">

                  <p className="text-gray-400 text-[10px]">

                    ACTIVE VIP

                  </p>

                  <h3 className="text-sm font-black text-yellow-400 mt-1">

                    {activePlan}

                  </h3>

                </div>

                <div className="bg-black/40 rounded-3xl p-3 border border-white/10 text-center">

                  <p className="text-gray-400 text-[10px]">

                    TEAM

                  </p>

                  <h3 className="text-lg font-black text-cyan-400 mt-1">

                    {totalTeam}

                  </h3>

                </div>

                <div className="bg-black/40 rounded-3xl p-3 border border-white/10 text-center">

                  <p className="text-gray-400 text-[10px]">

                    INCOME

                  </p>

                  <h3 className="text-sm font-black text-pink-400 mt-1">

                    ₹
                    {Number(
                      user.totalIncome || 0
                    ).toLocaleString()}

                  </h3>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* =========================
            ACCOUNT DETAILS
        ========================= */}

        <div className="mt-8 bg-zinc-900 border border-white/10 rounded-[38px] p-5 relative overflow-hidden">

          <div className="absolute top-0 right-0 w-52 h-52 bg-indigo-500/10 rounded-full blur-3xl">
          </div>

          <div className="relative z-10">

            <div className="flex items-center justify-between mb-6">

              <div>

                <h2 className="text-3xl font-black">

                  Account Details

                </h2>

                <p className="text-gray-400 text-sm mt-1">

                  Secure User Information

                </p>

              </div>

              <div className="px-3 py-2 rounded-full bg-green-500/10 border border-green-500/20">

                <p className="text-green-400 text-[10px] tracking-[2px] font-black">

                  VERIFIED

                </p>

              </div>

            </div>

            <div className="space-y-5">

              <div className="bg-black/40 rounded-3xl border border-white/10 p-5">

                <p className="text-gray-400 text-xs uppercase">

                  USER ID

                </p>

                <h3 className="text-lg font-black mt-2 break-all">

                  {user._id}

                </h3>

              </div>

              <div className="bg-black/40 rounded-3xl border border-white/10 p-5">

                <p className="text-gray-400 text-xs uppercase">

                  PHONE NUMBER

                </p>

                <h3 className="text-2xl font-black mt-2">

                  {user.phone}

                </h3>

              </div>

              <div className="bg-black/40 rounded-3xl border border-white/10 p-5">

                <p className="text-gray-400 text-xs uppercase">

                  REFERRAL CODE

                </p>

                <h3 className="text-2xl font-black mt-2 text-cyan-400">

                  {user.referralCode || "N/A"}

                </h3>

              </div>

            </div>

          </div>

        </div>

        {/* =========================
            BANK DETAILS
        ========================= */}

        <div className="mt-8 bg-zinc-900 border border-white/10 rounded-[38px] p-5 relative overflow-hidden">

          <div className="relative z-10">

            <div className="flex items-center justify-between mb-6">

              <div>

                <h2 className="text-3xl font-black">

                  Bank Details

                </h2>

                <p className="text-gray-400 text-sm mt-1">

                  Secure Withdrawal Account

                </p>

              </div>

              <a
                href="/bank"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 rounded-2xl text-sm font-black"
              >

                Edit

              </a>

            </div>

            <div className="space-y-5">

              <div className="bg-black/40 rounded-3xl border border-white/10 p-5">

                <p className="text-gray-400 text-xs uppercase">

                  Account Holder

                </p>

                <h3 className="text-2xl font-black mt-2">

                  {user.accountHolderName ||
                    "Not Added"}

                </h3>

              </div>

              <div className="bg-black/40 rounded-3xl border border-white/10 p-5">

                <p className="text-gray-400 text-xs uppercase">

                  Bank Name

                </p>

                <h3 className="text-2xl font-black mt-2">

                  {user.bankName ||
                    "Not Added"}

                </h3>

              </div>

              <div className="bg-black/40 rounded-3xl border border-white/10 p-5">

                <p className="text-gray-400 text-xs uppercase">

                  Account Number

                </p>

                <h3 className="text-2xl font-black mt-2 break-all">

                  {user.accountNumber ||
                    "Not Added"}

                </h3>

              </div>

              <div className="bg-black/40 rounded-3xl border border-white/10 p-5">

                <p className="text-gray-400 text-xs uppercase">

                  IFSC Code

                </p>

                <h3 className="text-2xl font-black mt-2">

                  {user.ifscCode ||
                    "Not Added"}

                </h3>

              </div>

              <div className="bg-black/40 rounded-3xl border border-white/10 p-5">

                <p className="text-gray-400 text-xs uppercase">

                  UPI ID

                </p>

                <h3 className="text-xl font-black mt-2 break-all">

                  {user.upiId ||
                    "Not Added"}

                </h3>

              </div>

            </div>

          </div>

        </div>

        {/* =========================
            LIVE STATUS
        ========================= */}

        <div className="mt-6 bg-zinc-900 border border-white/10 rounded-3xl p-4 overflow-hidden">

          <marquee
            scrollamount="5"
            className="text-cyan-400 text-sm font-bold"
          >

            🔥 Wallet Secured • VIP Running • Withdraw Enabled • Recharge Live • Team Income Active • Luxora Premium Connected

          </marquee>

        </div>

        {/* =========================
            REFRESH STATUS
        ========================= */}

        <div className="mt-5 text-center">

          <p className="text-xs text-gray-500">

            {
              refreshing
                ? "Syncing Profile..."
                : "Profile Synced Successfully"
            }

          </p>

        </div>

        {/* =========================
            ACTION BUTTONS
        ========================= */}

        <div className="grid grid-cols-2 gap-4 mt-8">

          <a
            href="/bank"
            className="bg-gradient-to-r from-cyan-500 to-blue-500 py-4 rounded-3xl font-black text-lg text-center shadow-[0_0_30px_rgba(59,130,246,0.35)]"
          >

            Edit Bank

          </a>

          <a
            href="/vip"
            className="bg-gradient-to-r from-yellow-500 to-orange-500 py-4 rounded-3xl font-black text-lg text-center shadow-[0_0_30px_rgba(250,204,21,0.35)]"
          >

            VIP Plans

          </a>

        </div>

        {/* =========================
            LOGOUT
        ========================= */}

        <button
          onClick={logoutUser}
          className="w-full mt-7 bg-gradient-to-r from-red-600 via-pink-500 to-orange-500 py-5 rounded-3xl font-black text-xl shadow-[0_0_45px_rgba(239,68,68,0.45)]"
        >

          LOGOUT

        </button>

      </div>

      <BottomNav />

    </div>

  );

}