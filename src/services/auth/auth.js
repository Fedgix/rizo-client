import axiosConfig from "../axios";

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
