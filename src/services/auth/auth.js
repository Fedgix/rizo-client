import axiosConfig from "../axios";

export const login = async () => {
  try {
    const { data } = await axiosConfig.post("users/auth/google/url");
    return data;
  } catch (error) {
    console.log(error);
  }
};
