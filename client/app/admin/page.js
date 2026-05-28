"use client";

import {
  useEffect,
  useState,
} from "react";

export default function AdminDashboard() {

  const [stats, setStats] =
    useState({});

  const [
    pendingRecharges,
    setPendingRecharges,
  ] = useState([]);

  const [
    pendingWithdraws,
    setPendingWithdraws,
  ] = useState([]);

  const [
    withdrawHistory,
    setWithdrawHistory,
  ] = useState([]);

  const [activeTab, setActiveTab] =
    useState("dashboard");

  const [loading, setLoading] =
    useState(false);

  const [
    adminNotes,
    setAdminNotes,
  ] = useState({});

  /* FETCH */
  const fetchData = async () => {
  try {
    setLoading(true);

    const [
      dashboardRes,
      rechargeRes,
      withdrawRes,
      historyRes,
    ] = await Promise.all([
      fetch("https://client-website-3rw8.onrender.com/api/admin/dashboard"),
      fetch("https://client-website-3rw8.onrender.com/api/recharge/pending"),
      fetch("https://client-website-3rw8.onrender.com/api/withdraw/pending"),
      fetch("https://client-website-3rw8.onrender.com/api/withdraw/all"),
    ]);

    const [
      dashboardData,
      rechargeData,
      withdrawData,
      historyData,
    ] = await Promise.all([
      dashboardRes.json(),
      rechargeRes.json(),
      withdrawRes.json(),
      historyRes.json(),
    ]);

    setStats(dashboardData);

    if (rechargeData.success) {
      setPendingRecharges(rechargeData.recharges);
    }

    if (withdrawData.success) {
      setPendingWithdraws(withdrawData.withdraws);
    }

    if (historyData.success) {
      setWithdrawHistory(historyData.withdraws);
    }

  } catch (error) {
    console.log("ADMIN ERROR =>", error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {

    fetchData();

    const interval =
      setInterval(() => {

        fetchData();

      }, 5000);

    return () =>
      clearInterval(
        interval
      );

  }, []);

  /* NOTES */

  const handleNoteChange =
    (id, value) => {

      setAdminNotes(

        (prev) => ({

          ...prev,

          [id]: value,

        })

      );

    };

  /* APPROVE RECHARGE */

  const approveRecharge =
    async (rechargeId) => {

      try {

        const response =
          await fetch(
            "https://client-website-3rw8.onrender.com/api/recharge/approve",
            {

              method: "POST",

              headers: {

                "Content-Type":
                  "application/json",

              },

              body: JSON.stringify({

                rechargeId,

              }),

            }
          );

        const data =
          await response.json();

        alert(
          data.message
        );

        fetchData();

      } catch (error) {

        console.log(error);

      }

    };

  /* REJECT RECHARGE */

  const rejectRecharge =
    async (rechargeId) => {

      try {

        const response =
          await fetch(
            "https://client-website-3rw8.onrender.com/api/recharge/reject",
            {

              method: "POST",

              headers: {

                "Content-Type":
                  "application/json",

              },

              body: JSON.stringify({

                rechargeId,

              }),

            }
          );

        const data =
          await response.json();

        alert(
          data.message
        );

        fetchData();

      } catch (error) {

        console.log(error);

      }

    };

  /* APPROVE WITHDRAW */

  const approveWithdraw =
    async (withdrawId) => {

      try {

        const response =
          await fetch(
            "https://client-website-3rw8.onrender.com/api/withdraw/approve",
            {

              method: "POST",

              headers: {

                "Content-Type":
                  "application/json",

              },

              body: JSON.stringify({

                withdrawId,

                adminNote:
                  adminNotes[
                    withdrawId
                  ] || "",

              }),

            }
          );

        const data =
          await response.json();

        alert(
          data.message
        );

        fetchData();

      } catch (error) {

        console.log(error);

      }

    };

  /* REJECT WITHDRAW */

  const rejectWithdraw =
    async (withdrawId) => {

      try {

        const response =
          await fetch(
            "https://client-website-3rw8.onrender.com/api/withdraw/reject",
            {

              method: "POST",

              headers: {

                "Content-Type":
                  "application/json",

              },

              body: JSON.stringify({

                withdrawId,

                adminNote:
                  adminNotes[
                    withdrawId
                  ] || "",

              }),

            }
          );

        const data =
          await response.json();

        alert(
          data.message
        );

        fetchData();

      } catch (error) {

        console.log(error);

      }

    };

  /* LOADING */

  if (!stats) {

    return (

      <div className="min-h-screen bg-black text-white flex items-center justify-center text-4xl font-black">

        Loading...

      </div>

    );

  }

  /* STATS */

  const statsData = [

    {
      title: "Users",
      value:
        stats.totalUsers || 0,
      icon: "👥",
      tab: "users",
      color:
        "from-cyan-500 to-blue-500",
    },

    {
      title: "Recharge",
      value:
        `₹${stats.totalRechargeAmount || 0}`,
      icon: "💰",
      tab: "recharges",
      color:
        "from-yellow-500 to-orange-500",
    },

    {
      title: "Withdraw",
      value:
        `₹${stats.totalWithdrawAmount || 0}`,
      icon: "🏦",
      tab: "withdraws",
      color:
        "from-green-500 to-emerald-500",
    },

    {
      title: "VIP",
      value:
        `₹${stats.totalVipSalesAmount || 0}`,
      icon: "💎",
      tab: "vip",
      color:
        "from-pink-500 to-purple-500",
    },

    {
      title: "History",
      value:
        withdrawHistory.length || 0,
      icon: "📜",
      tab: "history",
      color:
        "from-purple-500 to-indigo-500",
    },

  ];

  return (

    <div className="min-h-screen bg-black text-white p-4 md:p-8">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">

          <div>

            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-500">

              Luxora Admin

            </h1>

            <p className="text-gray-400 mt-3">

              Finance • Users • VIP • Withdraw

            </p>

          </div>

          <button
            onClick={fetchData}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-3 rounded-2xl font-black hover:scale-105 transition-all"
          >

            {
              loading
                ? "Refreshing..."
                : "Refresh Data"
            }

          </button>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-10">

          {

            statsData.map(

              (
                item,
                index
              ) => (

                <button
                  key={index}
                  onClick={() =>
                    setActiveTab(
                      item.tab
                    )
                  }
                  className={`bg-gradient-to-r ${item.color} rounded-3xl p-[1.5px] hover:scale-[1.03] transition-all`}
                >

                  <div className="bg-zinc-900 rounded-3xl p-6 h-full">

                    <div className="flex items-center justify-between">

                      <div>

                        <p className="text-gray-400 text-sm">

                          {
                            item.title
                          }

                        </p>

                        <h2 className="text-3xl font-black mt-3">

                          {
                            item.value
                          }

                        </h2>

                      </div>

                      <div className="text-5xl">

                        {
                          item.icon
                        }

                      </div>

                    </div>

                  </div>

                </button>

              )

            )

          }

        </div>

        {/* DASHBOARD */}

        {
          activeTab ===
          "dashboard" && (

            <div className="grid md:grid-cols-2 gap-5">

              <div className="bg-zinc-900 rounded-3xl p-6 border border-white/10">

                <h2 className="text-3xl font-black text-green-400 mb-4">

                  Platform Balance

                </h2>

                <p className="text-6xl font-black">

                  ₹
                  {
                    stats.totalPlatformBalance || 0
                  }

                </p>

              </div>

              <div className="bg-zinc-900 rounded-3xl p-6 border border-white/10">

                <h2 className="text-3xl font-black text-yellow-400 mb-4">

                  Pending Requests

                </h2>

                <p className="text-xl mt-4">

                  Recharge:
                  {" "}
                  {
                    pendingRecharges.length
                  }

                </p>

                <p className="text-xl mt-2">

                  Withdraw:
                  {" "}
                  {
                    pendingWithdraws.length
                  }

                </p>

              </div>

            </div>

          )
        }

        {/* USERS */}

        {
          activeTab ===
          "users" && (

            <div className="bg-zinc-900 rounded-3xl p-6 border border-white/10 mt-6">

              <h2 className="text-3xl font-black text-cyan-400 mb-6">

                Registered Users

              </h2>

              {
                stats.users?.map(

                  (user) => (

                    <div
                      key={user._id}
                      className="bg-black/40 border border-white/10 rounded-3xl p-5 mb-5"
                    >

                      <p className="text-2xl font-black">

                        {
                          user.name
                        }

                      </p>

                      <p className="text-gray-400 mt-2">

                        {
                          user.email
                        }

                      </p>

                      <p className="text-gray-400 mt-2">

                        {
                          user.phone
                        }

                      </p>

                      <p className="text-green-400 font-black mt-3">

                        ₹
                        {
                          user.balance
                        }

                      </p>

                    </div>

                  )

                )
              }

            </div>

          )
        }

        {/* RECHARGES */}

        {
          activeTab ===
          "recharges" && (

            <div className="bg-zinc-900 rounded-3xl p-6 border border-white/10 mt-6">

              <h2 className="text-3xl font-black text-yellow-400 mb-6">

                Pending Recharges

              </h2>

              {
                pendingRecharges.length === 0 ? (

                  <p className="text-gray-400">

                    No Pending Recharges

                  </p>

                ) : (

                  pendingRecharges.map(

                    (item) => (

                      <div
                        key={item._id}
                        className="bg-black/40 border border-white/10 rounded-3xl p-5 mb-5"
                      >

                        <p className="text-2xl font-black">

                          {
                            item.userId?.name
                          }

                        </p>

                        <p className="text-gray-400 mt-2">

                          {
                            item.userId?.email
                          }

                        </p>

                        <p className="text-yellow-400 font-black mt-2">

                          ₹
                          {
                            item.amount
                          }

                        </p>

                        <p className="text-gray-400 mt-2">

                          UTR:
                          {" "}
                          {
                            item.utrNumber
                          }

                        </p>

                        <div className="flex gap-3 mt-5">

                          <button
                            onClick={() =>
                              approveRecharge(
                                item._id
                              )
                            }
                            className="bg-green-500 px-5 py-2 rounded-2xl font-black"
                          >

                            Approve

                          </button>

                          <button
                            onClick={() =>
                              rejectRecharge(
                                item._id
                              )
                            }
                            className="bg-red-500 px-5 py-2 rounded-2xl font-black"
                          >

                            Reject

                          </button>

                        </div>

                      </div>

                    )

                  )

                )
              }

            </div>

          )
        }

        {/* WITHDRAWS */}

        {
          activeTab ===
          "withdraws" && (

            <div className="bg-zinc-900 rounded-3xl p-6 border border-white/10 mt-6">

              <h2 className="text-3xl font-black text-green-400 mb-6">

                Pending Withdraws

              </h2>

              {
                pendingWithdraws.length === 0 ? (

                  <p className="text-gray-400">

                    No Pending Withdraws

                  </p>

                ) : (

                  pendingWithdraws.map(

                    (item) => (

                      <div
                        key={item._id}
                        className="bg-black/40 border border-white/10 rounded-3xl p-5 mb-5"
                      >

                        <p className="text-2xl font-black">

                          {
                            item.userId?.name
                          }

                        </p>

                        <p className="text-gray-400 mt-2">

                          {
                            item.userId?.email
                          }

                        </p>

                        <p className="text-green-400 font-black mt-2">

                          ₹
                          {
                            item.amount
                          }

                        </p>

                        <p className="text-gray-400 mt-2">

                          TXN:
                          {" "}
                          {
                            item.transactionId
                          }

                        </p>

                        <textarea
                          placeholder="Admin Note"
                          value={
                            adminNotes[
                              item._id
                            ] || ""
                          }
                          onChange={(e) =>
                            handleNoteChange(

                              item._id,

                              e.target.value

                            )
                          }
                          className="w-full bg-black border border-white/10 rounded-2xl p-3 mt-4 outline-none"
                        />

                        <div className="flex gap-3 mt-5">

                          <button
                            onClick={() =>
                              approveWithdraw(
                                item._id
                              )
                            }
                            className="bg-green-500 px-5 py-2 rounded-2xl font-black"
                          >

                            Approve

                          </button>

                          <button
                            onClick={() =>
                              rejectWithdraw(
                                item._id
                              )
                            }
                            className="bg-red-500 px-5 py-2 rounded-2xl font-black"
                          >

                            Reject + Refund

                          </button>

                        </div>

                      </div>

                    )

                  )

                )
              }

            </div>

          )
        }

        {/* VIP */}

        {
          activeTab ===
          "vip" && (

            <div className="bg-zinc-900 rounded-3xl p-10 border border-white/10 text-center mt-6">

              <h2 className="text-4xl font-black text-pink-400">

                VIP Sales

              </h2>

              <p className="text-7xl font-black mt-5 text-pink-400">

                ₹
                {
                  stats.totalVipSalesAmount || 0
                }

              </p>

            </div>

          )
        }

        {/* HISTORY */}

        {
          activeTab ===
          "history" && (

            <div className="bg-zinc-900 rounded-3xl p-6 border border-white/10 mt-6">

              <h2 className="text-3xl font-black text-purple-400 mb-6">

                Withdraw History

              </h2>

              {
                withdrawHistory.length === 0 ? (

                  <p className="text-gray-400">

                    No History Found

                  </p>

                ) : (

                  withdrawHistory.map(

                    (item) => (

                      <div
                        key={item._id}
                        className="bg-black/40 border border-white/10 rounded-3xl p-5 mb-5"
                      >

                        <p className="text-2xl font-black">

                          {
                            item.userId?.name ||
                            "Unknown User"
                          }

                        </p>

                        <p className="text-gray-400 mt-2">

                          ₹
                          {
                            item.amount
                          }

                        </p>

                        <p className="text-gray-400 mt-2">

                          TXN:
                          {" "}
                          {
                            item.transactionId
                          }

                        </p>

                        <p className="mt-2">

                          Status:
                          {" "}

                          <span
                            className={`font-black ${
                              item.status === "approved"
                                ? "text-green-400"
                                : item.status === "rejected"
                                ? "text-red-400"
                                : "text-yellow-400"
                            }`}
                          >

                            {
                              item.status
                            }

                          </span>

                        </p>

                      </div>

                    )

                  )

                )
              }

            </div>

          )
        }

      </div>

    </div>

  );

}