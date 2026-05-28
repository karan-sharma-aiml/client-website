"use client";

import {
  useState,
} from "react";

import BottomNav from "../../components/BottomNav";

export default function BankPage() {

  const [bankName, setBankName] =
    useState("");

  const [
    accountHolderName,
    setAccountHolderName,
  ] = useState("");

  const [
    accountNumber,
    setAccountNumber,
  ] = useState("");

  const [ifscCode, setIfscCode] =
    useState("");

  const [upiId, setUpiId] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const saveBankDetails =
    async () => {

      try {

        const storedUser =
          localStorage.getItem(
            "user"
          );

        const user =
          JSON.parse(storedUser);

        /* VALIDATION */

        const bankFilled =

          bankName &&
          accountHolderName &&
          accountNumber &&
          ifscCode;

        const upiFilled =

          upiId &&
          accountHolderName;

        if (
          !bankFilled &&
          !upiFilled
        ) {

          alert(
            "Add Complete Bank Or UPI Details"
          );

          return;

        }

        setLoading(true);

        const response =
          await fetch(
            "https://client-website-3rw8.onrender.com/api/user/bank/update",
            {

              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({

                userId:
                  user._id,

                bankName,

                accountHolderName,

                accountNumber,

                ifscCode,

                upiId,

              }),

            }
          );

        const data =
          await response.json();

        if (data.success) {

          alert(
            "Payment Details Saved Successfully"
          );

          localStorage.setItem(
            "user",
            JSON.stringify(
              data.user
            )
          );

        } else {

          alert(
            data.message
          );

        }

      } catch (error) {

        console.log(error);

        alert(
          "Something Went Wrong"
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="min-h-screen bg-black text-white px-4 py-6 pb-28 overflow-hidden relative">

      {/* BACKGROUND GLOW */}

      <div className="absolute top-0 left-[-120px] w-72 h-72 bg-green-500/10 rounded-full blur-3xl">
      </div>

      <div className="absolute top-[45%] right-[-120px] w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl">
      </div>

      <div className="absolute bottom-0 left-[20%] w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl">
      </div>

      <div className="max-w-md mx-auto relative z-10">

        {/* HEADER */}

        <div className="text-center mb-8">

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-green-500/10 border border-green-500/20 shadow-[0_0_25px_rgba(34,197,94,0.15)]">

            <div className="w-2 h-2 rounded-full bg-green-400 animate-ping">
            </div>

            <p className="text-green-400 font-bold text-xs tracking-[4px]">

              SECURE PAYMENT DETAILS

            </p>

          </div>

          <h1 className="text-5xl font-black mt-5 text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-green-500 to-cyan-400 drop-shadow-[0_0_25px_rgba(34,197,94,0.8)] animate-pulse">

            PAYMENT DETAILS

          </h1>

          <p className="text-gray-400 mt-4 text-sm leading-7 px-4">

            Add your bank account or UPI
            details securely for fast and
            safe withdrawals.

          </p>

        </div>

        {/* MAIN CARD */}

        <div className="relative bg-zinc-900 rounded-[38px] p-5 border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.05)] overflow-hidden">

          <div className="absolute -top-20 -right-10 w-52 h-52 bg-green-500/10 rounded-full blur-3xl">
          </div>

          <div className="absolute bottom-0 left-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl">
          </div>

          <div className="relative z-10">

            {/* BANK SECTION */}

            <div className="mb-8">

              <div className="flex items-center justify-between mb-4">

                <h2 className="text-2xl font-black text-green-400">

                  Bank Account

                </h2>

                <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">

                  <p className="text-green-400 text-[10px] font-black tracking-[2px]">

                    RECOMMENDED

                  </p>

                </div>

              </div>

              <div className="space-y-4">

                <input
                  type="text"
                  placeholder="Bank Name"
                  value={bankName}
                  onChange={(e) =>
                    setBankName(
                      e.target.value
                    )
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-3xl px-5 py-4 outline-none focus:border-green-500 focus:shadow-[0_0_20px_rgba(34,197,94,0.2)] transition-all duration-300"
                />

                <input
                  type="text"
                  placeholder="Account Holder Name"
                  value={
                    accountHolderName
                  }
                  onChange={(e) =>
                    setAccountHolderName(
                      e.target.value
                    )
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-3xl px-5 py-4 outline-none focus:border-green-500 focus:shadow-[0_0_20px_rgba(34,197,94,0.2)] transition-all duration-300"
                />

                <input
                  type="text"
                  placeholder="Account Number"
                  value={
                    accountNumber
                  }
                  onChange={(e) =>
                    setAccountNumber(
                      e.target.value
                    )
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-3xl px-5 py-4 outline-none focus:border-green-500 focus:shadow-[0_0_20px_rgba(34,197,94,0.2)] transition-all duration-300"
                />

                <input
                  type="text"
                  placeholder="IFSC Code"
                  value={ifscCode}
                  onChange={(e) =>
                    setIfscCode(
                      e.target.value
                    )
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-3xl px-5 py-4 outline-none focus:border-green-500 focus:shadow-[0_0_20px_rgba(34,197,94,0.2)] transition-all duration-300"
                />

              </div>

            </div>

            {/* OR */}

            <div className="flex items-center gap-4 my-8">

              <div className="flex-1 h-[1px] bg-white/10">
              </div>

              <p className="text-gray-400 text-sm tracking-[3px]">

                OR

              </p>

              <div className="flex-1 h-[1px] bg-white/10">
              </div>

            </div>

            {/* UPI SECTION */}

            <div className="mb-8">

              <div className="flex items-center justify-between mb-4">

                <h2 className="text-2xl font-black text-cyan-400">

                  UPI Details

                </h2>

                <div className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">

                  <p className="text-cyan-400 text-[10px] font-black tracking-[2px]">

                    OPTIONAL

                  </p>

                </div>

              </div>

              <div className="space-y-4">

                <input
                  type="text"
                  placeholder="UPI Holder Name"
                  value={
                    accountHolderName
                  }
                  onChange={(e) =>
                    setAccountHolderName(
                      e.target.value
                    )
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-3xl px-5 py-4 outline-none focus:border-cyan-500 focus:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all duration-300"
                />

                <input
                  type="text"
                  placeholder="Enter UPI ID"
                  value={upiId}
                  onChange={(e) =>
                    setUpiId(
                      e.target.value
                    )
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-3xl px-5 py-4 outline-none focus:border-cyan-500 focus:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all duration-300"
                />

              </div>

            </div>

            {/* SECURITY NOTICE */}

            <div className="relative bg-black/40 border border-white/10 rounded-[30px] p-5 mb-7 overflow-hidden">

              <div className="absolute inset-0 opacity-10 bg-gradient-to-r from-green-500 to-cyan-500">
              </div>

              <div className="relative z-10 flex items-center justify-between">

                <div>

                  <p className="text-green-400 font-black text-lg">

                    Security Protected

                  </p>

                  <p className="text-sm text-gray-400 mt-2 leading-6">

                    Double check your details
                    before saving to avoid wrong
                    withdrawals.

                  </p>

                </div>

                <div className="text-5xl opacity-20">
                  🔒
                </div>

              </div>

            </div>

            {/* BUTTON */}

            <button
              onClick={
                saveBankDetails
              }
              disabled={loading}
              className="relative overflow-hidden w-full bg-gradient-to-r from-green-600 via-emerald-500 to-cyan-500 py-4 rounded-3xl font-black text-lg tracking-wide shadow-xl hover:shadow-[0_0_40px_rgba(34,197,94,0.35)] hover:scale-105 active:scale-95 transition-all duration-300"
            >

              <span className="absolute inset-0 opacity-0 hover:opacity-100 transition-all duration-1000 bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.45),transparent)] translate-x-[-200%] hover:translate-x-[200%]">
              </span>

              <span className="relative z-10">

                {loading
                  ? "SAVING..."
                  : "SAVE PAYMENT DETAILS"}

              </span>

            </button>

          </div>

        </div>

      </div>

      <BottomNav />

    </div>

  );

}