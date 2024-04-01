import axios from "axios";

const backendUrl = "https://narottam-kumarbhardwaj-ece23-heritageit.onrender.com/api/v1";

// handling get products API
export const getProducts = async (filterQuery) => {
  try {
    const requrl = `${backendUrl}/product/all`;
    const queryParameters = {
      ...filterQuery,
    };
    const response = await axios.get(requrl, {
      params: queryParameters,
    });

    return response;
  } catch (error) {
    if (error) {
      return error?.response;
    }
  }
};

//handling get product detail API
export const getProductDetail = async (productId) => {
  try {
    const reqUrl = `${backendUrl}/product/${productId}`;
    const response = await axios.get(reqUrl);
    return response;
  } catch (error) {
    return error?.response;
  }
};





