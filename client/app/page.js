"use client";

import useAuth
from "../hooks/useAuth";

import useUser
from "../hooks/useUser";

import Loader
from "../components/Loader";

import Header
from "../components/Header";

import BottomNav
from "../components/BottomNav";

import WalletCard
from "../components/WalletCard";

import ActionGrid
from "../components/ActionGrid";

export default function HomePage() {

  useAuth();

  const {
    user,
    loading,
  } = useUser();

  if (
    loading ||
    !user
  ) {

    return <Loader />;

  }

  return (

    <div className="min-h-screen bg-black text-white px-4 py-6 pb-32">

      <div className="max-w-md mx-auto">

        <Header
          phone={user.phone}
        />

        <WalletCard user={user} />

        <ActionGrid />

        <div className="bg-zinc-900 rounded-[40px] p-6 border border-white/10">

          <p className="text-gray-400">

            Wallet Balance

          </p>

          <h1 className="text-5xl font-black mt-3">

            ₹
            {Number(
              user.balance || 0
            ).toLocaleString()}

          </h1>

        </div>

      </div>

      <BottomNav />

    </div>

  );

}