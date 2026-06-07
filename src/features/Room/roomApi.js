import { axiosMethod, axiosRequest } from "../../utils/fetchUtil";

const apiEndPoint = process.env.REACT_APP_API_ENDPOINT;
const authenEndPoint = apiEndPoint + "/room";

export const roomAPI = {
  getRoomsAPI: (hotelId) => {
    return axiosRequest(
      `${authenEndPoint}/get-all-room/${hotelId}`,
      axiosMethod.GET,
      null,
      null
    );
  },
  getRoomsFilterAPI: (data, hotelId) => {
    return axiosRequest(
      `${authenEndPoint}/get-room-filter/${hotelId}`,
      axiosMethod.POST,
      null,
      data
    );
  },
};
