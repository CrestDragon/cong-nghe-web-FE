import { axiosMethod, axiosRequest } from "../../utils/fetchUtil";

const apiEndPoint = process.env.REACT_APP_API_ENDPOINT;
const authenEndPoint = apiEndPoint + "/user";

export const profileAPI = {
  updateUserAPI: (data, id) => {
    return axiosRequest(`${authenEndPoint}/${id}`, axiosMethod.PUT, null, data);
  },

  changePasswordAPI: (data) => {
    return axiosRequest(
      `${authenEndPoint}/v1/change-password`,
      axiosMethod.PUT,
      null,
      data
    );
  },
};
