import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "src/redux/auth";
import LoadingScreen from "src/components/LoadingScreen";
import { deleteCookie, getCookie } from "src/helpers/cookie";
import userAPI from "src/api/user";
import { axiosClient } from "src/api";

export const CheckAuth = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [check, setCheck] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token") || getCookie("token");
    //axiosClient.defaults.headers.common["token"] = "Bearer " + token;
    const verifyAccount = async () => {
      if (!user && !check) {
        console.log(token);
        if (token) {
          const res = await userAPI.verify();
          console.log(res);
          setCheck(true);
          dispatch(login(res.data.token));
        } else {
          setCheck(true);
        }
      }
    };
    verifyAccount();
  }, [check, user, dispatch]);

  if (!user && !check) {
    return <LoadingScreen />;
  }

  return children;
};
