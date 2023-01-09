import client from "utils/axios.utils";

const Auth = {
  register: async (data) => {
    try {
      const user = await (await client()).post("/v1/user/signup", data);
      return user.data;
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
  checkEmail: async (data) => {
    try {
      const user = await (await client()).post("/v1/user/check_email", data);
      return user.data;
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
  confirmEmail: async (data) => {
    try {
      const user = await (await client()).post("/v1/user/confirm", data);
      return user.data;
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
  login: async (data) => {
    try {
      const user = await (await client()).post("/v1/user/login", data);
      return user.data;
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
  forgotPassword: async (data) => {
    try {
      const user = await (
        await client()
      ).post("/v1/user/forgot_password", data);
      return user.data;
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
  verifyOtp: async (data) => {
    try {
      const user = await (await client()).post("/v1/user/verify_otp", data);
      return user.data;
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
  resetPassword: async (data) => {
    try {
      const user = await (await client()).post("/v1/user/reset_password", data);
      return user.data;
    } catch (err) {
      console.log("err", err);
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
  resendVerification: async (data) => {
    try {
      const user = await (
        await client()
      ).post("/v1/user/resend_verification", data);
      return user.data;
    } catch (err) {
      console.log("err", err);
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
  getUser: async () => {
    try {
      const user = await (await client()).post("/v1/user/get");
      return user.data;
    } catch (err) {
      console.log("err", err);
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
  updateUser: async (data) => {
    try {
      const user = await (await client()).post("/v1/user/update_user", data);
      return user.data;
    } catch (err) {
      console.log("err", err);
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

export default Auth;
