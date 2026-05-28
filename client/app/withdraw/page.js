"use client";

import {
  useEffect,
  useState,
} from "react";

import BottomNav
  from "../../components/BottomNav";

export default function WithdrawPage() {

  const [user, setUser] =
    useState(null);

  const [amount, setAmount] =
    useState("");

  const [

    withdrawPassword,

    setWithdrawPassword,

  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [

    withdrawHistory,

    setWithdrawHistory,

  ] = useState([]);

  /* LOAD USER */

  useEffect(() => {

    const storedUser =
      localStorage.getItem(
        "user"
      );

    if (storedUser) {

      const parsedUser =
        JSON.parse(
          storedUser
        );

      setUser(
        parsedUser
      );

      fetchWithdrawHistory(
        parsedUser._id
      );

    }

  }, []);

  /* FETCH HISTORY */

  const fetchWithdrawHistory =
    async (userId) => {

      try {

        const response =
          await fetch(

            `http://localhost:5000/api/withdraw/history/${userId}`

          );

        const data =
          await response.json();

        if (data.success) {

          setWithdrawHistory(
            data.withdraws
          );

        }

      } catch (error) {

        console.log(error);

      }

    };

  /* WITHDRAW */

  const handleWithdraw =
    async () => {

      try {

        if (
          !amount ||
          !withdrawPassword
        ) {

          alert(
            "Please Fill All Fields"
          );

          return;

        }

        const withdrawAmount =
          Number(amount);

        if (

          isNaN(
            withdrawAmount
          ) ||

          withdrawAmount <= 0

        ) {

          alert(
            "Invalid Amount"
          );

          return;

        }

        if (
          withdrawAmount < 100
        ) {

          alert(
            "Minimum Withdraw ₹100"
          );

          return;

        }

        if (
          withdrawAmount >
          Number(
            user.balance
          )
        ) {

          alert(

            `Insufficient Balance. Available ₹${user.balance}`

          );

          return;

        }

        setLoading(true);

        const response =
          await fetch(

            "http://localhost:5000/api/withdraw/create",

            {

              method: "POST",

              headers: {

                "Content-Type":
                  "application/json",

              },

              body: JSON.stringify({

                userId:
                  user._id,

                amount:
                  withdrawAmount,

                withdrawPassword,

              }),

            }

          );

        const data =
          await response.json();

        if (data.success) {

          /* UPDATE USER */

          const updatedUser = {

            ...user,

            balance:
              data.balance,

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

          /* RESET */

          setAmount("");

          setWithdrawPassword("");

          /* REFRESH HISTORY */

          fetchWithdrawHistory(
            user._id
          );

          alert(

            `Withdraw Submitted\nTransaction ID: ${data.transactionId}`

          );

        } else {

          alert(
            data.message
          );

        }

      } catch (error) {

        console.log(error);

        alert(
          "Withdraw Failed"
        );

      } finally {

        setLoading(false);

      }

    };

  /* LOADING */

  if (!user) {

    return (

      <div className="min-h-screen bg-black flex items-center justify-center text-white text-2xl font-black">

        Loading...

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-black text-white px-4 py-6 pb-32 overflow-hidden relative">

      {/* BG */}

      <div className="absolute top-0 left-[-120px] w-72 h-72 bg-green-500/10 rounded-full blur-3xl">
      </div>

      <div className="absolute top-[45%] right-[-120px] w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl">
      </div>

      <div className="max-w-md mx-auto relative z-10">

        {/* HEADER */}

        <div className="text-center mb-8">

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-green-500/10 border border-green-500/20">

            <div className="w-2 h-2 rounded-full bg-green-400 animate-ping">
            </div>

            <p className="text-green-400 font-bold text-xs tracking-[4px]">

              SECURE WITHDRAW

            </p>

          </div>

          <h1 className="text-5xl font-black mt-5 text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-green-500 to-emerald-500">

            WITHDRAW

          </h1>

        </div>

        {/* BALANCE */}

        <div className="bg-gradient-to-r from-green-600 via-emerald-500 to-lime-500 rounded-[36px] p-[1.5px] mb-8">

          <div className="bg-zinc-900 rounded-[36px] p-6">

            <p className="text-gray-400 text-sm uppercase tracking-widest">

              Available Balance

            </p>

            <h2 className="text-5xl font-black mt-3">

              ₹
              {
                Number(
                  user.balance
                ).toFixed(0)
              }

            </h2>

          </div>

        </div>

        {/* PAYMENT DETAILS */}

        <div className="bg-zinc-900 rounded-[38px] p-5 border border-white/10 mb-6">

          <div className="flex items-center justify-between mb-4">

            <p className="text-gray-400 text-sm tracking-widest">

              PAYMENT DETAILS

            </p>

            <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">

              <p className="text-green-400 text-[10px] font-black">

                VERIFIED

              </p>

            </div>

          </div>

          {

            user.bankName ? (

              <>

                <p className="text-2xl font-black">

                  {
                    user.bankName
                  }

                </p>

                <p className="text-gray-400 mt-3">

                  {
                    user.accountHolderName
                  }

                </p>

                <p className="text-gray-400 mt-1">

                  XXXX XXXX
                  {" "}
                  {
                    user.accountNumber?.slice(-4)
                  }

                </p>

                <p className="text-gray-400 mt-1">

                  IFSC:
                  {" "}
                  {
                    user.ifscCode
                  }

                </p>

              </>

            ) : (

              <>

                <p className="text-2xl font-black">

                  UPI PAYMENT

                </p>

                <p className="text-gray-400 mt-3">

                  {
                    user.upiId
                  }

                </p>

              </>

            )

          }

        </div>

        {/* AMOUNT */}

        <div className="bg-zinc-900 rounded-[38px] p-5 border border-white/10 mb-6">

          <label className="text-gray-400 text-sm block mb-3">

            Enter Withdraw Amount

          </label>

          <div className="relative">

            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-green-400 text-xl font-black">

              ₹

            </span>

            <input

              type="text"

              inputMode="numeric"

              placeholder="Enter Amount"

              value={amount}

              onChange={(e) => {

                const value =
                  e.target.value.replace(
                    /[^0-9]/g,
                    ""
                  );

                setAmount(value);

              }}

              className="w-full bg-black/40 border border-white/10 rounded-3xl pl-12 pr-5 py-4 outline-none focus:border-green-500 text-lg font-semibold"

            />

          </div>

          <div className="flex justify-between mt-3 text-xs text-gray-500">

            <p>
              Minimum ₹100
            </p>

            <p>
              Balance ₹
              {
                user.balance
              }
            </p>

          </div>

        </div>

        {/* PASSWORD */}

        <div className="bg-zinc-900 rounded-[38px] p-5 border border-white/10 mb-6">

          <input

            type="password"

            placeholder="Enter Withdraw Password"

            value={
              withdrawPassword
            }

            onChange={(e) =>
              setWithdrawPassword(
                e.target.value
              )
            }

            className="w-full bg-black/40 border border-white/10 rounded-3xl px-5 py-4 outline-none focus:border-green-500"

          />

        </div>

        {/* BUTTON */}

        <button

          onClick={
            handleWithdraw
          }

          disabled={loading}

          className="w-full bg-gradient-to-r from-green-600 via-emerald-500 to-lime-500 py-4 rounded-3xl font-black text-lg hover:scale-105 active:scale-95 transition-all duration-300"

        >

          {

            loading
              ? "PROCESSING..."
              : "WITHDRAW NOW 🚀"

          }

        </button>

        {/* HISTORY */}

        <div className="mt-10">

          <h2 className="text-2xl font-black mb-5 text-green-400">

            Withdraw History

          </h2>

          {

            withdrawHistory.length === 0 ? (

              <div className="bg-zinc-900 rounded-3xl p-5 border border-white/10 text-center text-gray-400">

                No Withdraw History

              </div>

            ) : (

              withdrawHistory.map(

                (item) => (

                  <div

                    key={
                      item._id
                    }

                    className="bg-zinc-900 rounded-3xl p-5 border border-white/10 mb-4"

                  >

                    <div className="flex items-center justify-between">

                      <div>

                        <p className="text-2xl font-black">

                          ₹
                          {
                            item.amount
                          }

                        </p>

                        <p className="text-gray-400 text-sm mt-2">

                          {
                            item.transactionId
                          }

                        </p>

                      </div>

                      <div>

                        <p className={`px-3 py-1 rounded-full text-xs font-black

                        ${

                          item.status === "approved"

                            ? "bg-green-500/20 text-green-400"

                            : item.status === "rejected"

                            ? "bg-red-500/20 text-red-400"

                            : "bg-yellow-500/20 text-yellow-400"

                        }`}>

                          {
                            item.status
                          }

                        </p>

                      </div>

                    </div>

                    {

                      item.adminNote && (

                        <p className="text-gray-400 text-sm mt-3">

                          Note:
                          {" "}
                          {
                            item.adminNote
                          }

                        </p>

                      )

                    }

                    <p className="text-xs text-gray-500 mt-3">

                      {
                        new Date(
                          item.createdAt
                        ).toLocaleString()
                      }

                    </p>

                  </div>

                )

              )

            )

          }

        </div>

      </div>

      <BottomNav />

    </div>

  );

}