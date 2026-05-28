"use client";

import { useEffect, useState }
from "react";

import {
  getUserBalance,
} from "../services/userService";

export default function useUser() {

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchUser =
      async () => {

        try {

          const storedUser =
            localStorage.getItem(
              "user"
            );

          if (!storedUser)
            return;

          const parsedUser =
            JSON.parse(
              storedUser
            );

          const data =
            await getUserBalance(
              parsedUser._id
            );

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

        }

      };

    fetchUser();

  }, []);

  return {
    user,
    loading,
  };

}