import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { removeSession } from "../../features/authSlice";

const baseQueryWithReauth = (baseUrl) => async (args, api, extraOptions) => {
  let result = await fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  })(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    api.dispatch(removeSession());
  }

  return result;
};

export default baseQueryWithReauth;
