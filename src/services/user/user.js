import axiosConfig from "../axios";

export const getBanner = async (query) => {
  try {
    console.log(query, "❤️‍🩹❤️‍🩹❤️‍🩹❤️‍🩹❤️‍🩹❤️‍🩹");
    const { data } = await axiosConfig.get(`banner${query}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCategories = async () => {
  try {
    const { data } = await axiosConfig.get(`category`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = async (page, filter) => {
  try {
    const { data } = await axiosConfig.get(`product?page=${page}${filter}`);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSingleProduct = async (productId) => {
  try {
    const { data } = await axiosConfig.get(`product/${productId}`);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const newArrivels = async (limit) => {
  try {
    const { data } = await axiosConfig.get(
      `product/new-arrivals/all?limit=${limit}`
    );
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const addToCart = async (payload) => {
  try {
    const { data } = await axiosConfig.post("cart", payload);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.error);
  }
};

export const getCart = async () => {
  try {
    const { data } = await axiosConfig.get("cart/6836fd29c1c36dcec69b99b6");
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateQuantity = async (params, body) => {
  try {
    console.log(params, body, "dl;klkdj");
    const { data } = await axiosConfig.patch(`cart${params}`, body);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (product, body) => {
  try {
    console.log(body, product, "❌❌❌");
    const { data } = await axiosConfig.delete(`cart/${product}`, body);
    console.log(data, "❗");
  } catch (error) {
    console.log(error);
  }
};
