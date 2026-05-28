import API_URL from "./api";

export const getUserBalance =
  async (userId) => {

    const response =
      await fetch(

        `${API_URL}/api/user/balance/${userId}`,

        {
          cache: "no-store",
        }

      );

    return response.json();

};