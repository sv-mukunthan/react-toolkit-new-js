import client from "utils/axios.utils";

const Dashboard = {
  getCountDetails: async () => {
    try {
      const cart = await (await client()).get("/v1/dashboard/get_count");
      return cart.data;
    } catch (err) {
      if (
        err?.response?.data?.validation &&
        err?.response?.data?.validation?.body?.message
      ) {
        throw err?.response?.data?.validation?.body?.message
          .split('"')
          .join("");
      } else if (err?.response?.data?.message) {
        throw err?.response?.data?.message;
      } else if (err?.message) {
        throw err?.message;
      } else {
        throw err;
      }
    }
  },
};

export default Dashboard;
