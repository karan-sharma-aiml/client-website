"use client";

import {
  useEffect,
  useState,
} from "react";

import BottomNav from "../../components/BottomNav";

export default function VipPage() {

  const [user, setUser] =
    useState(null);

  const [loadingId, setLoadingId] =
    useState(null);

  const [refreshing, setRefreshing] =
    useState(false);

  /* =========================
     LOAD USER
  ========================= */

  const loadUser =
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

            `https://client-website-3rw8.onrender.com/api/user/balance/${parsedUser._id}`,

            {

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

      }

    };

  useEffect(() => {

    loadUser();

  }, []);

  /* =========================
     VIP PLANS
  ========================= */

  const vipPlans = [

    {
      id: 1,
      name: "VIP 1",
      price: 500,
      dailyIncome: 110,
      totalDays: 120,
      image: "/vip1.png",
      color:
        "from-yellow-500 via-orange-500 to-amber-500",
    },

    {
      id: 2,
      name: "VIP 2",
      price: 1500,
      dailyIncome: 400,
      totalDays: 120,
      image: "/vip2.png",
      color:
        "from-pink-500 via-red-500 to-rose-500",
    },

    {
      id: 3,
      name: "VIP 3",
      price: 5000,
      dailyIncome: 1500,
      totalDays: 120,
      image: "/vip3.png",
      color:
        "from-cyan-500 via-blue-500 to-indigo-500",
    },

    {
      id: 4,
      name: "VIP 4",
      price: 10000,
      dailyIncome: 3200,
      totalDays: 120,
      image: "/vip4.png",
      color:
        "from-violet-500 via-purple-500 to-fuchsia-500",
    },

    {
      id: 5,
      name: "VIP 5",
      price: 25000,
      dailyIncome: 8500,
      totalDays: 120,
      image: "/vip5.png",
      color:
        "from-emerald-500 via-green-500 to-lime-500",
    },

  ];

  /* =========================
     BUY VIP
  ========================= */

  const buyVip =
    async (plan) => {

      try {

        if (!user) {

          alert(
            "Please Login First"
          );

          return;

        }

        /* ALREADY ACTIVE */

        if (
          user.activePlan ===
          plan.name
        ) {

          alert(
            `${plan.name} Already Active`
          );

          return;

        }

        const currentBalance =
          Number(
            user.balance || 0
          );

        const vipPrice =
          Number(
            plan.price || 0
          );

        const dailyIncome =
          Number(
            plan.dailyIncome || 0
          );

        const totalDays =
          Number(
            plan.totalDays || 0
          );

        if (
          currentBalance <
          vipPrice
        ) {

          const rechargeNow =
            window.confirm(

              `Insufficient Balance\n\nNeed ₹${vipPrice}\nAvailable ₹${currentBalance}\n\nGo To Recharge?`

            );

          if (rechargeNow) {

            window.location.href =

              `/recharge?amount=${vipPrice}`;

          }

          return;

        }

        setLoadingId(
          plan.id
        );

        const response =
          await fetch(

            "https://client-website-3rw8.onrender.com/api/vip/buy",

            {

              method: "POST",

              headers: {

                "Content-Type":
                  "application/json",

              },

              body: JSON.stringify({

                userId:
                  user._id,

                vipLevel:
                  Number(
                    plan.id
                  ),

                vipName:
                  plan.name,

                price:
                  vipPrice,

                dailyIncome:
                  dailyIncome,

                totalDays:
                  totalDays,

              }),

            }

          );

        const data =
          await response.json();

        if (data.success) {

          const updatedUser = {

            ...user,

            balance:
              Number(
                data.balance || 0
              ),

            vipLevel:
              Number(
                plan.id
              ),

            activePlan:
              plan.name,

            vipExpireAt:
              data.vipExpireAt,

          };

          setUser(
            updatedUser
          );

          localStorage.setItem(

            "user",

            JSON.stringify(
              updatedUser
            )

          );

          alert(

            `${plan.name} Activated Successfully`

          );

        } else {

          alert(

            data.message ||
            "VIP Purchase Failed"

          );

        }

      } catch (error) {

        console.log(error);

        alert(
          "Server Error"
        );

      } finally {

        setLoadingId(
          null
        );

      }

    };

  /* =========================
     LOADING
  ========================= */

  if (!user) {

    return (

      <div className="min-h-screen bg-black flex items-center justify-center text-white">

        <div className="text-center">

          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto">
          </div>

          <p className="mt-5 text-xl font-black">

            Loading VIP Plans...

          </p>

        </div>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-black text-white px-4 py-6 pb-28 overflow-hidden relative">

      {/* BACKGROUND */}

      <div className="absolute top-0 left-[-100px] w-72 h-72 bg-pink-500/10 rounded-full blur-3xl">
      </div>

      <div className="absolute top-[40%] right-[-100px] w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl">
      </div>

      <div className="absolute bottom-0 left-[20%] w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl">
      </div>

      <div className="max-w-md mx-auto relative z-10">

        {/* HEADER */}

        <div className="text-center mb-10">

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20">

            <div className="w-2 h-2 rounded-full bg-yellow-400 animate-ping">
            </div>

            <p className="text-yellow-400 font-bold text-xs tracking-[4px]">

              LUXORA PREMIUM

            </p>

          </div>

          <h1 className="text-5xl font-black mt-5 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-orange-500">

            VIP PLANS

          </h1>

          <p className="text-gray-400 mt-4 text-sm">

            Upgrade Your Earnings Experience

          </p>

        </div>

        {/* ACTIVE VIP */}

        <div className="mb-6 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/20 rounded-[32px] p-5 backdrop-blur-xl">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-400 text-sm">

                Current Active VIP

              </p>

              <h2 className="text-4xl font-black text-yellow-400 mt-2">

                {
                  user.activePlan ||
                  "No Plan"
                }

              </h2>

            </div>

            <div className="text-5xl">

              👑

            </div>

          </div>

          {

            user.vipExpireAt && (

              <p className="text-xs text-cyan-400 mt-4">

                Expire:
                {" "}
                {

                  new Date(
                    user.vipExpireAt
                  ).toLocaleDateString()

                }

              </p>

            )

          }

        </div>

        {/* BALANCE */}

        <div className="mb-8 bg-zinc-900 border border-white/10 rounded-[32px] p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-400 text-sm">

                Available Balance

              </p>

              <h2 className="text-5xl font-black mt-3 text-green-400">

                ₹
                {

                  Number(
                    user.balance || 0
                  ).toLocaleString()

                }

              </h2>

            </div>

            <div className="text-6xl opacity-20">

              💰

            </div>

          </div>

          <div className="grid grid-cols-3 gap-3 mt-5">

            <div className="bg-black/40 rounded-3xl p-3 text-center border border-white/10">

              <p className="text-gray-400 text-[10px]">

                VIP LEVEL

              </p>

              <h3 className="text-xl font-black text-yellow-400 mt-1">

                VIP
                {" "}
                {user.vipLevel || 0}

              </h3>

            </div>

            <div className="bg-black/40 rounded-3xl p-3 text-center border border-white/10">

              <p className="text-gray-400 text-[10px]">

                TOTAL VIP

              </p>

              <h3 className="text-xl font-black text-cyan-400 mt-1">

                ₹
                {

                  Number(
                    user.totalVipIncome || 0
                  ).toLocaleString()

                }

              </h3>

            </div>

            <div className="bg-black/40 rounded-3xl p-3 text-center border border-white/10">

              <p className="text-gray-400 text-[10px]">

                PURCHASES

              </p>

              <h3 className="text-xl font-black text-pink-400 mt-1">

                {
                  user.totalVipPurchases || 0
                }

              </h3>

            </div>

          </div>

        </div>

        {/* VIP LIST */}

        <div className="space-y-8">

          {

            vipPlans.map(
              (plan) => {

                const totalIncome =

                  Number(
                    plan.dailyIncome
                  ) *

                  Number(
                    plan.totalDays
                  );

                const isActive =

                  user.activePlan ===
                  plan.name;

                return (

                  <div
                    key={plan.id}
                    className={`relative bg-gradient-to-r ${plan.color} rounded-[38px] p-[1.5px]`}
                  >

                    <div className="bg-zinc-900 rounded-[38px] p-5 overflow-hidden relative">

                      {/* ACTIVE BADGE */}

                      {

                        isActive && (

                          <div className="absolute top-4 right-4 bg-green-500 text-black text-xs font-black px-4 py-2 rounded-full shadow-xl">

                            ACTIVE

                          </div>

                        )

                      }

                      {/* TOP */}

                      <div className="flex items-start justify-between gap-4">

                        <div>

                          <div className={`inline-flex px-4 py-1 rounded-full bg-gradient-to-r ${plan.color} text-white text-[11px] font-black`}>

                            PREMIUM VIP

                          </div>

                          <h2 className="text-3xl font-black mt-4">

                            {plan.name}

                          </h2>

                          <p className="text-gray-400 text-sm mt-2">

                            Daily Automatic Income

                          </p>

                        </div>

                        <img
                          src={plan.image}
                          alt="VIP"
                          className="w-32 h-32 rounded-[28px] object-cover border border-white/10"
                        />

                      </div>

                      {/* DETAILS */}

                      <div className="grid grid-cols-3 gap-3 mt-6">

                        <div className="bg-black/40 rounded-3xl p-4 text-center border border-white/10">

                          <p className="text-gray-400 text-[10px] uppercase">

                            Price

                          </p>

                          <h3 className="text-2xl font-black mt-2">

                            ₹{plan.price}

                          </h3>

                        </div>

                        <div className="bg-black/40 rounded-3xl p-4 text-center border border-green-400/10">

                          <p className="text-gray-400 text-[10px] uppercase">

                            Daily

                          </p>

                          <h3 className="text-2xl font-black mt-2 text-green-400">

                            ₹{plan.dailyIncome}

                          </h3>

                        </div>

                        <div className="bg-black/40 rounded-3xl p-4 text-center border border-cyan-400/10">

                          <p className="text-gray-400 text-[10px] uppercase">

                            Days

                          </p>

                          <h3 className="text-2xl font-black mt-2 text-cyan-400">

                            {plan.totalDays}

                          </h3>

                        </div>

                      </div>

                      {/* TOTAL */}

                      <div className="mt-5 bg-black/40 border border-yellow-400/10 rounded-3xl p-5">

                        <div className="flex items-center justify-between">

                          <div>

                            <p className="text-gray-400 text-xs uppercase">

                              Total Income

                            </p>

                            <h3 className="text-4xl font-black mt-2 text-yellow-400">

                              ₹
                              {

                                Number(
                                  totalIncome
                                ).toLocaleString()

                              }

                            </h3>

                          </div>

                          <div className="text-6xl opacity-20">

                            💰

                          </div>

                        </div>

                      </div>

                      {/* BUY BUTTON */}

                      <button

                        onClick={() =>
                          buyVip(plan)
                        }

                        disabled={

                          loadingId ===
                            plan.id ||

                          isActive

                        }

                        className={`w-full mt-7 py-4 rounded-3xl font-black text-lg transition-all duration-300 ${
                          isActive
                            ? "bg-green-500 text-black"
                            : `bg-gradient-to-r ${plan.color} hover:scale-105 active:scale-95`
                        }`}
                      >

                        {

                          loadingId ===
                          plan.id

                            ? "PROCESSING..."

                            : isActive

                            ? "ACTIVE PLAN"

                            : `BUY NOW ₹${plan.price}`

                        }

                      </button>

                    </div>

                  </div>

                );

              }

            )

          }

        </div>

        {/* REFRESH */}

        <div className="text-center mt-6">

          <button

            onClick={async () => {

              setRefreshing(
                true
              );

              await loadUser();

              setRefreshing(
                false
              );

            }}

            className="bg-zinc-900 border border-white/10 px-6 py-3 rounded-2xl text-sm font-black hover:scale-105 transition-all duration-300"

          >

            {

              refreshing
                ? "Refreshing..."
                : "Refresh Wallet"

            }

          </button>

        </div>

      </div>

      <BottomNav />

    </div>

  );

}