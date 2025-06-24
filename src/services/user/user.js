import axiosConfig from "../axios";

export const getBanner = async (query) => {
  try {
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

export const newArrivels = async (limit, filter) => {
  try {
    const { data } = await axiosConfig.get(
      `product/new-arrivals/all?limit=${limit}${filter}`
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
    const { data } = await axiosConfig.get("cart");
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

export const deleteProduct = async (product) => {
  try {
    await axiosConfig.delete(`cart/${product}`);
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.error);
  }
};

export const addAddress = async (values) => {
  try {
    const { data } = await axiosConfig.post("address", values);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.error);
  }
};

export const getAddress = async () => {
  try {
    const { data } = await axiosConfig.get("address");
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.error);
  }
};

export const deleteAddress = async (id) => {
  try {
    const { data } = await axiosConfig.delete(`address/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    if (error.message === "Network Error") {
      throw new Error(error.message);
    } else {
      throw new Error(error.response.data.error);
    }
  }
};

export const editAddress = async (id, values) => {
  try {
    const { data } = await axiosConfig.put(`address/${id}`, values);
    return data;
  } catch (error) {
    console.log(error);
    if (error.message === "Network Error") {
      throw new Error(error.message);
    } else {
      throw new Error(error.response.data.error);
    }
  }
};

export const makeDefultAddress = async (id) => {
  try {
    const { data } = await axiosConfig.patch(`address/${id}/default`);
    return data;
  } catch (error) {
    console.log(error);
    if (error.message === "Network Error") {
      throw new Error(error.message);
    } else {
      throw new Error(error.response.data.error);
    }
  }
};

export const openSearch = async (values) => {
  try {
    const { data } = await axiosConfig.get(`search?q=${values}`);
    return data.data
  } catch (error) {
    console.log(error);
  }
};


export const contactFormSubmit =  async(values)=>{
  try {
    const {data} = await axiosConfig.post(`contact`,values)
    return data
  } catch (error) {
    console.log(error)
  }
}