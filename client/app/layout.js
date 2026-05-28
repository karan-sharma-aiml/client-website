import { Geist, Geist_Mono }
from "next/font/google";

import "../styles/globals.css";
import "../styles/animations.css";
import "../styles/wallet.css";
import "../styles/vip.css";
import "../styles/admin.css";

const geistSans = Geist({

  variable:
    "--font-geist-sans",

  subsets:
    ["latin"],

});

const geistMono =
  Geist_Mono({

    variable:
      "--font-geist-mono",

    subsets:
      ["latin"],

  });

export const metadata = {

  title:
    "Luxora",

  description:
    "Luxora VIP Platform",

};

export default function RootLayout({
  children
}) {

  return (

    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >

      <body className="min-h-full flex flex-col bg-black text-white">

        {children}

      </body>

    </html>

  );

}