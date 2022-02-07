import { useEffect } from "react";
import { RootState } from "interfaces/redux/store";
import { useSelector } from "react-redux";
import axios from "axios";
import { baseUrl } from "@constants";

export const useAxiosInterceptors = () => {
  const token = useSelector<RootState>((state) => state.auth.token);
  useEffect(() => {
    axios.interceptors.request.use((req) => {
      //req.headers.authorization = `Token ${token}`;
      req.headers["Content-Type"] = "application/json; charset=UTF-8";
      req.baseURL = baseUrl;
      return req;
    });
  }, [token]);
};
