import { axiosMethod, axiosRequest } from "../../utils/fetchUtil";

const apiEndPoint = process.env.REACT_APP_API_ENDPOINT;
const authenEndPoint = apiEndPoint + "/order";

export const orderAPI = {
  createOrderAPI: (data) => {
    return axiosRequest(
      `${authenEndPoint}/create`,
      axiosMethod.POST,
      null,
      data
    );
  },
  getUserOrdersAPI: (id) => {
    return axiosRequest(
      `${authenEndPoint}/list/${id}`,
      axiosMethod.GET,
      null,
      null
    );
  },
  deleteOrderAPI: (id) => {
    return axiosRequest(
      `${authenEndPoint}/${id}`,
      axiosMethod.DELETE,
      null,
      null
    );
  },
};
