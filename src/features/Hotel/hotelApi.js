import { axiosMethod, axiosRequest } from "../../utils/fetchUtil";

const apiEndPoint = process.env.REACT_APP_API_ENDPOINT;
const authenEndPoint = apiEndPoint + "/hotel";

export const hotelAPI = {
  getOneHotelAPI: (data, id) => {
    return axiosRequest(
      `${authenEndPoint}/find/${id}`,
      axiosMethod.GET,
      null,
      null
    );
  },

  getAllHotelAPI: (data) => {
    return axiosRequest(`${authenEndPoint}/`, axiosMethod.GET, null, null);
  },

  getHotelByFilterAPI: (data) => {
    return axiosRequest(`${authenEndPoint}/find`, axiosMethod.POST, null, data);
  },
};
