import { axiosMethod, axiosRequest } from "../../utils/fetchUtil";

const apiEndPoint = process.env.REACT_APP_API_ENDPOINT;
const authenEndPoint = apiEndPoint + "/auth";

export const authAPI = {
  loginAPI: (data) => {
    return axiosRequest(
      `${authenEndPoint}/login`,
      axiosMethod.POST,
      null,
      data
    );
  },

  registerAPI: (data) => {
    return axiosRequest(
      `${authenEndPoint}/register`,
      axiosMethod.POST,
      null,
      data
    );
  },

  logoutAPI: (data) => {
    return axiosRequest(
      `${authenEndPoint}/logout`,
      axiosMethod.POST,
      null,
      null
    );
  },
  changeAvatarAPI: async (data, userId) => {
    return await axiosRequest(
      `${authenEndPoint}/change-avatar/${userId}`,
      axiosMethod.PUT,
      null,
      data
    );
  },
};
