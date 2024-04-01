import axios from "axios";

const backendUrl = "https://narottam-kumarbhardwaj-ece23-heritageit.onrender.com/api/v1";

// order place API
export const orderPlace = async (address, paymentMode, productId) => {
  try {
    if (productId === null) {
      var reqUrl = `${backendUrl}/order/place`;
    } else if (productId !== null) {
      var reqUrl = `${backendUrl}/order/place?productId=${productId}`;
    }
    const reqPayload = { address, paymentMode };

    //setting header
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.post(reqUrl, reqPayload);
    return response;
  } catch (error) {
    return error?.response;
  }
};

// get all orders API
export const getAllOrders = async () => {
  try {
    const reqUrl = `${backendUrl}/order/all`;

    //setting header
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.get(reqUrl);
    return response;
  } catch (error) {
    return error?.response;
  }
};

//Handle get single order detail API
export const getOrderDetail = async (orderId) => {
  try {
    const reqUrl = `${backendUrl}/order/${orderId}`;

    //setting header
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.get(reqUrl);
    return response;
  } catch (error) {
    return error?.response;
  }
};
