import axios from "axios";

const backendUrl = "https://narottam-kumarbhardwaj-ece23-heritageit.onrender.com/api/v1";

// handle add to cart API
export const AddToCart = async (
  productId,
) => {
  try {
    const reqPayload = {
      productId,
    };
    const reqUrl = `${backendUrl}/cart/add`;

    //setting header
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.post(reqUrl, reqPayload);

    return response;
  } catch (error) {
    return error?.response;
  }
};

// handle product Quantity change API
export const changeProductQuantity = async (cartId, newQuantity) => {
  try {
    const reqUrl = `${backendUrl}/cart/updateQuantity`;
    const reqPayload = { cartId, newQuantity };

    //setting header
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.put(reqUrl, reqPayload);
    return response;
    
  } catch ( error ) {
    return error?.response;
  }
};

// handle get all cart data API
export const getCartData = async () => {
  try {
    const reqUrl = `${backendUrl}/cart/all`;

    //setting header
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.get(reqUrl);
    return response;
  } catch (error) {
    return error?.response;
  }
};

// get total product quantity API
export const getTotalQuantity = async () => {
  try {
    const reqUrl = `${backendUrl}/cart/total`;

    //setting header
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.get(reqUrl);
    return response;
  } catch (error) {
    return error?.response;
  }
};

// buy now api
export const buyNow = async ( productId ) => {
  try {
    const reqUrl = `${backendUrl}/cart/buyNow/${productId}`;

    //setting header
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.get(reqUrl);
    return response;
    
  } catch (error) {
    return error?.response;
  }
}
