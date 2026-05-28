"use client";

import { motion }
from "framer-motion";

export default function WalletCard({
  user,
}) {

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 30,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      transition={{
        duration: 0.5,
      }}

      className="relative bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500 rounded-[40px] p-[1.5px] shadow-[0_0_60px_rgba(168,85,247,0.35)] overflow-hidden"

    >

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

          <div className="grid grid-cols-2 gap-4 mt-7">

            <div className="bg-black/40 border border-white/10 rounded-3xl p-4">

              <p className="text-gray-400 text-xs">

                VIP LEVEL

              </p>

              <h3 className="text-2xl font-black mt-2 text-yellow-400">

                VIP {user.vipLevel || 0}

              </h3>

            </div>

            <div className="bg-black/40 border border-white/10 rounded-3xl p-4">

              <p className="text-gray-400 text-xs">

                TOTAL INCOME

              </p>

              <h3 className="text-2xl font-black mt-2 text-green-400">

                ₹
                {Number(
                  user.totalIncome || 0
                ).toLocaleString()}

              </h3>

            </div>

          </div>

        </div>

      </div>

    </motion.div>

  );

}