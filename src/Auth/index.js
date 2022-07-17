import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userAPI from "src/api/user";
import LoadingScreen from "src/components/LoadingScreen";
import { getCookie } from "src/helpers/cookie";
import { login } from "src/redux/auth";

export const CheckAuth = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [check, setCheck] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token") || getCookie("token");
    //axiosClient.defaults.headers.common["token"] = "Bearer " + token;
    const verifyAccount = async () => {
      if (!user && !check) {
        if (token) {
          const res = await userAPI.verify();
          setCheck(true);
          dispatch(login(res.data));
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
