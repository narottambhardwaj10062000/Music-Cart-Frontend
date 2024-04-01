import axios from "axios";

const backendUrl = "https://narottam-kumarbhardwaj-ece23-heritageit.onrender.com/api/v1";

//Handling Register API
export const handleUserRegistration = async ({
  name,
  email,
  mobile,
  password,
}) => {
  try {
    const reqUrl = `${backendUrl}/auth/register`;
    const reqPayload = { name, email, mobile, password };
    const response = await axios.post(reqUrl, reqPayload);
    return response;
  } catch (error) {
    return error?.response;
  }
};

//Hndling Login API
export const handleUserLogin = async ({ emailOrMobile, password }) => {
  try {
    // const email = emailOrMobile;
    const reqUrl = `${backendUrl}/auth/login`;
    const reqPayload = { emailOrMobile, password };
    const response = await axios.post(reqUrl, reqPayload);
    return response;
  } catch (error) {
    return error?.response;
  }
};

// Checking whether user is authenticated or not
export const checkLogin = async () => {
  try {
    const reqUrl = `${backendUrl}/auth/protected`;

    //setting header
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.get(reqUrl);
    return response;
  } catch ( error ) {
    return error?.response;
  }
}
