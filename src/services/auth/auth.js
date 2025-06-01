import axiosConfig from "../axios";
import Cookies from "js-cookie";

export const login = async (endPoint) => {
  try {
    const { data } = await axiosConfig.post("users/auth/google/url", {
      endpoint: endPoint,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    await axiosConfig.post("users/logout");
    Cookies.remove("rizoUser");
    Cookies.remove("refreshToken");
  } catch (error) {
    console.log(error);
  }
};
