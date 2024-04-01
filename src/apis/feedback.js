import axios from "axios";

const backendUrl = "https://narottam-kumarbhardwaj-ece23-heritageit.onrender.com/api/v1";

export const sendFeedback = async (type, message) => {
    try {
        const reqUrl = `${backendUrl}/feedback/create`;
        const reqPayload = {type, message};

        //setting header
        const token = JSON.parse(localStorage.getItem("token"));
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        const response = await axios.post(reqUrl, reqPayload);
        return response;

    } catch ( error ) {
        return error?.response;
    }
}