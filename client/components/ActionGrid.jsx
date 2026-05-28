"use client";

const actions = [

  {
    name: "Recharge",
    icon: "💰",
    link: "/recharge",
    color:
      "from-red-500 to-pink-500",
  },

  {
    name: "Withdraw",
    icon: "🏦",
    link: "/withdraw",
    color:
      "from-green-500 to-emerald-500",
  },

  {
    name: "VIP",
    icon: "💎",
    link: "/vip",
    color:
      "from-yellow-500 to-orange-500",
  },

  {
    name: "Income",
    icon: "📈",
    link: "/income",
    color:
      "from-cyan-500 to-blue-500",
  },

  {
    name: "History",
    icon: "📜",
    link: "/history",
    color:
      "from-violet-500 to-purple-500",
  },

  {
    name: "Team",
    icon: "👥",
    link: "/team",
    color:
      "from-sky-500 to-indigo-500",
  },

  {
    name: "Support",
    icon: "🎧",
    link: "/support",
    color:
      "from-orange-500 to-red-500",
  },

  {
    name: "Profile",
    icon: "🧑",
    link: "/profile",
    color:
      "from-lime-500 to-green-500",
  },

];

export default function ActionGrid() {

  return (

    <div className="grid grid-cols-4 gap-4 mt-8">

      {

        actions.map(

          (
            item,
            index
          ) => (

            <a
              href={item.link}
              key={index}
            >

              <div className={`bg-gradient-to-r ${item.color} rounded-[30px] p-[1.5px] hover:scale-105 active:scale-95 transition-all duration-300`}>

                <div className="bg-zinc-900 rounded-[30px] py-5 px-2 flex flex-col items-center justify-center min-h-[110px]">

                  <div className="text-3xl">

                    {item.icon}

                  </div>

                  <p className="text-xs font-black mt-3 text-center leading-4">

                    {item.name}

                  </p>

                </div>

              </div>

            </a>

          )

        )

      }

    </div>

  );

}