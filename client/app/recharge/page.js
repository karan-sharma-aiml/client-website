"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useSearchParams,
} from "next/navigation";

import BottomNav from "../../components/BottomNav";

export default function RechargePage() {

  const searchParams =
    useSearchParams();

  const [timeLeft, setTimeLeft] =
    useState(600);

  const [expired, setExpired] =
    useState(false);

  const [utrNumber, setUtrNumber] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [selectedApp, setSelectedApp] =
    useState("");

  const [successPopup, setSuccessPopup] =
    useState(false);

  const [rechargeStatus, setRechargeStatus] =
    useState("");

  const [screenshot, setScreenshot] =
    useState(null);

  /* =========================
     YOUR UPI
  ========================= */

  const upiId =
    "6209085637@upi";

  /* =========================
     VIP AUTO AMOUNT
  ========================= */

  useEffect(() => {

    const vipAmount =
      searchParams.get(
        "amount"
      );

    if (vipAmount) {

      setAmount(
        vipAmount
      );

    }

  }, [searchParams]);

  /* =========================
     TIMER
  ========================= */

  useEffect(() => {

    if (timeLeft <= 0) {

      setExpired(true);

      return;

    }

    const timer =
      setInterval(() => {

        setTimeLeft(
          (prev) => prev - 1
        );

      }, 1000);

    return () =>
      clearInterval(timer);

  }, [timeLeft]);

  const minutes =
    Math.floor(
      timeLeft / 60
    );

  const seconds =
    timeLeft % 60;

  /* =========================
     COPY UPI
  ========================= */

  const copyUpi =
    async () => {

      try {

        await navigator.clipboard.writeText(
          upiId
        );

        alert(
          "UPI ID Copied Successfully"
        );

      } catch (error) {

        console.log(error);

      }

    };

  /* =========================
     QUICK AMOUNTS
  ========================= */

  const quickAmounts = [

    100,
    500,
    1000,
    5000,

  ];

  /* =========================
     OPEN PAYMENT APP
  ========================= */

  const openPaymentApp =
    (app) => {

      if (!amount) {

        alert(
          "Please Enter Amount First"
        );

        return;

      }

      const paymentAmount =
        Number(amount);

      if (
        paymentAmount <= 0
      ) {

        alert(
          "Enter Valid Amount"
        );

        return;

      }

      setSelectedApp(
        app
      );

      const universalUpiLink =

        `upi://pay?pa=${upiId}&pn=Luxora&am=${paymentAmount}&cu=INR`;

      const isMobile =

        /Android|iPhone|iPad|iPod/i.test(
          navigator.userAgent
        );

      if (isMobile) {

        try {

          if (
            app === "phonepe"
          ) {

            window.location.href =
              `phonepe://pay?pa=${upiId}&pn=Luxora&am=${paymentAmount}&cu=INR`;

            return;

          }

          if (
            app === "gpay"
          ) {

            window.location.href =
              `tez://upi/pay?pa=${upiId}&pn=Luxora&am=${paymentAmount}&cu=INR`;

            return;

          }

          if (
            app === "paytm"
          ) {

            window.location.href =
              `paytmmp://pay?pa=${upiId}&pn=Luxora&am=${paymentAmount}&cu=INR`;

            return;

          }

        } catch (error) {

          console.log(error);

        }

        window.location.href =
          universalUpiLink;

      } else {

        alert(

          "UPI Apps Open Only On Mobile Devices"

        );

      }

    };

  /* =========================
     SUBMIT RECHARGE
  ========================= */

  const handleRecharge =
    async () => {

      try {

        const storedUser =
          localStorage.getItem(
            "user"
          );

        if (!storedUser) {

          alert(
            "Please Login First"
          );

          return;

        }

        const user =
          JSON.parse(
            storedUser
          );

        if (
          !utrNumber ||
          !amount
        ) {

          alert(
            "Please Fill All Fields"
          );

          return;

        }

        if (
          utrNumber.length !== 12
        ) {

          alert(
            "UTR Must Be 12 Digits"
          );

          return;

        }

        const finalAmount =
          Number(amount);

        if (
          finalAmount < 100
        ) {

          alert(
            "Minimum Recharge ₹100"
          );

          return;

        }

        setLoading(true);

        const response =
          await fetch(
            "http://localhost:5000/api/recharge/create",
            {

              method: "POST",

              headers: {

                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${localStorage.getItem("token")}`,

              },

              body: JSON.stringify({

                userId:
                  user._id,

                amount:
                  finalAmount,

                utrNumber,

              }),

            }
          );

        const data =
          await response.json();

        if (data.success) {

          setSuccessPopup(
            true
          );

          setRechargeStatus(
            "Pending Approval"
          );

          setUtrNumber("");

          setTimeout(() => {

            window.location.href =
              "/history";

          }, 2500);

        } else {

          alert(
            data.message
          );

        }

      } catch (error) {

        console.log(error);

        alert(
          "Server Error"
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="min-h-screen bg-black text-white p-4 pb-28 overflow-hidden relative">

      {/* SUCCESS POPUP */}

      {

        successPopup && (

          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-5">

            <div className="bg-zinc-900 border border-green-500/20 rounded-[40px] p-8 text-center w-full max-w-sm">

              <div className="text-7xl mb-5">
                ✅
              </div>

              <h2 className="text-3xl font-black text-green-400">

                Recharge Submitted

              </h2>

              <p className="text-gray-400 mt-3">

                Waiting For Admin Approval

              </p>

            </div>

          </div>

        )

      }

      {/* BACKGROUND */}

      <div className="absolute top-0 left-[-100px] w-72 h-72 bg-pink-500/10 rounded-full blur-3xl">
      </div>

      <div className="absolute top-[40%] right-[-100px] w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl">
      </div>

      <div className="absolute bottom-0 left-[20%] w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl">
      </div>

      <div className="max-w-md mx-auto relative z-10">

        {/* HEADER */}

        <div className="text-center mb-8">

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-red-500/10 border border-red-500/20">

            <div className="w-2 h-2 rounded-full bg-red-400 animate-ping">
            </div>

            <p className="text-red-400 text-xs font-bold tracking-[4px]">

              SECURE PAYMENT

            </p>

          </div>

          <h1 className="text-5xl font-black mt-5 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-orange-400">

            Recharge Wallet

          </h1>

        </div>

        {/* MAIN CARD */}

        <div className="bg-zinc-900 rounded-[36px] p-5 border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.03)]">

          {/* LIVE STATUS */}

          <div className="mb-5 flex items-center justify-between bg-black/40 border border-white/10 rounded-3xl px-5 py-4">

            <div>

              <p className="text-gray-400 text-xs">

                Payment Gateway

              </p>

              <h3 className="text-green-400 font-black mt-1">

                LIVE & SECURED

              </h3>

            </div>

            <div className="w-4 h-4 rounded-full bg-green-400 animate-ping">
            </div>

          </div>

          {/* QR */}

          <div className="relative overflow-hidden rounded-[30px]">

            <img
              src="/QR.png"
              alt="QR"
              className="w-full rounded-[30px]"
            />

          </div>

          {/* TIMER */}

          <div className="mt-6 text-center">

            {

              expired ? (

                <p className="text-red-500 font-black text-lg">

                  Recharge Session Expired

                </p>

              ) : (

                <div>

                  <p className="text-yellow-400 font-black text-3xl">

                    {minutes}:
                    {
                      seconds < 10
                        ? `0${seconds}`
                        : seconds
                    }

                  </p>

                  <p className="text-gray-500 text-xs mt-2">

                    Payment Session Timer

                  </p>

                </div>

              )

            }

          </div>

          {/* UPI */}

          <div className="mt-8">

            <div className="flex items-center justify-between bg-black/40 rounded-3xl px-5 py-4 border border-white/10">

              <div>

                <p className="text-gray-500 text-xs mb-1">

                  UPI ID

                </p>

                <p className="font-black text-base break-all">

                  {upiId}

                </p>

              </div>

              <button
                onClick={copyUpi}
                className="bg-gradient-to-r from-red-600 via-pink-500 to-orange-500 px-5 py-2 rounded-2xl text-sm font-black"
              >

                Copy

              </button>

            </div>

          </div>

          {/* QUICK AMOUNTS */}

          <div className="mt-6">

            <p className="text-gray-400 text-sm mb-4">

              Quick Amount

            </p>

            <div className="grid grid-cols-4 gap-3">

              {

                quickAmounts.map(

                  (item, index) => (

                    <button
                      key={index}
                      onClick={() =>
                        setAmount(
                          item
                        )
                      }
                      className="bg-black/40 border border-white/10 rounded-2xl py-3 font-black"
                    >

                      ₹{item}

                    </button>

                  )

                )

              }

            </div>

          </div>

          {/* AMOUNT */}

          <div className="mt-6">

            <label className="text-gray-400 text-sm">

              Enter Amount

            </label>

            <input
              type="text"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) =>
                setAmount(
                  e.target.value.replace(
                    /\D/g,
                    ""
                  )
                )
              }
              className="w-full mt-3 bg-black/40 border border-white/10 rounded-3xl px-5 py-4 outline-none text-xl font-black"
            />

          </div>

          {/* PAYMENT APPS */}

          <div className="mt-7">

            <p className="text-gray-400 text-sm mb-4 font-bold">

              Quick Payment Apps

            </p>

            <div className="flex items-center justify-center gap-5">

              {

                [
                  {
                    name:
                      "phonepe",

                    img:
                      "/Phonepe.png",
                  },

                  {
                    name:
                      "gpay",

                    img:
                      "/Gpay.png",
                  },

                  {
                    name:
                      "paytm",

                    img:
                      "/Paytm.png",
                  },

                ].map(
                  (
                    item,
                    index
                  ) => (

                    <button
                      key={index}
                      type="button"
                      onClick={() =>
                        openPaymentApp(
                          item.name
                        )
                      }
                    >

                      <img
                        src={
                          item.img
                        }
                        alt={
                          item.name
                        }
                        className={`w-16 h-16 rounded-2xl object-cover border transition-all duration-300 ${
                          selectedApp ===
                          item.name

                            ? "border-pink-500 scale-110"

                            : "border-white/10"
                        }`}
                      />

                    </button>

                  )
                )

              }

            </div>

          </div>

          {/* SCREENSHOT */}

          <div className="mt-6">

            <label className="text-gray-400 text-sm">

              Upload Payment Screenshot

            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setScreenshot(
                  e.target.files[0]
                )
              }
              className="w-full mt-3 bg-black/40 border border-white/10 rounded-3xl px-5 py-4"
            />

          </div>

          {/* UTR */}

          <div className="mt-7">

            <label className="text-gray-400 text-sm">

              Enter UTR Number

            </label>

            <input
              type="text"
              placeholder="Enter 12 Digit UTR"
              value={utrNumber}
              onChange={(e) =>
                setUtrNumber(
                  e.target.value.replace(
                    /\D/g,
                    ""
                  )
                )
              }
              maxLength={12}
              className="w-full mt-3 bg-black/40 border border-white/10 rounded-3xl px-5 py-4 outline-none"
            />

          </div>

          {/* RECHARGE STATUS */}

          {

            rechargeStatus && (

              <div className="mt-5 bg-yellow-500/10 border border-yellow-500/20 rounded-3xl p-4">

                <p className="text-yellow-400 font-black text-center">

                  {rechargeStatus}

                </p>

              </div>

            )

          }

          {/* SECURITY NOTE */}

          <div className="mt-5 bg-green-500/10 border border-green-500/20 rounded-3xl p-4">

            <p className="text-green-400 text-sm leading-6">

              ✅ Use Same UPI App For Fast Approval
              <br />
              ✅ Recharge Approved Within Few Minutes
              <br />
              ✅ Enter Correct 12 Digit UTR Number

            </p>

          </div>

          {/* ANTI FRAUD */}

          <div className="mt-5 bg-red-500/10 border border-red-500/20 rounded-3xl p-4">

            <p className="text-red-400 text-sm leading-6">

              ⚠ Do Not Submit Fake UTR
              <br />
              ⚠ Fake Payments Can Suspend Account
              <br />
              ⚠ Recharge Only To Official UPI

            </p>

          </div>

          {/* SUBMIT */}

          <button
            type="button"
            onClick={handleRecharge}
            disabled={
              expired || loading
            }
            className={`w-full mt-8 py-4 rounded-3xl font-black text-lg transition-all duration-300 ${
              expired
                ? "bg-gray-700"
                : "bg-gradient-to-r from-red-600 via-pink-500 to-orange-500"
            }`}
          >

            {

              loading ? (

                <div className="flex items-center justify-center gap-3">

                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin">
                  </div>

                  PROCESSING

                </div>

              ) : expired ? (

                "SESSION EXPIRED"

              ) : (

                `SUBMIT ₹${amount || 0} RECHARGE`

              )

            }

          </button>

        </div>

      </div>

      <BottomNav />

    </div>

  );

}