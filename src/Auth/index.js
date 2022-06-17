import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import api from "src/api";
import { login } from "src/app/auth";
import LoadingScreen from "src/components/LoadingScreen";
import { deleteCookie, getCookie } from "src/helpers/cookie";


export const RequireAuth = ({ children }) => {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const location = useLocation();
    const [check, setCheck] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token") || getCookie("token");
        api.defaults.headers.common["Authorization"] = "Bearer " + token;
        if (!user && !check) {
            if (token) {
                api.get("/me").then((res) => {
                    if (res.status && res.data.user) {
                        dispatch(login(res.data.user));
                        setCheck(true);
                    } else {
                        localStorage.removeItem("token");
                        deleteCookie("token");
                        setCheck(true);
                    }
                });
            } else {
                setCheck(true);
            }
        }
    }, [check, user, dispatch]);

    if (!user && !check) {
        return <LoadingScreen />;
    }

    if (!user) {
        if (location.pathname === "/register") {
            return <Navigate to={`/register${location.search}`} state={{ from: location }
            } replace />;
        } else if (location.pathname === "/forget-password") {
            return <Navigate to={`/forget-password${location.search}`} state={{ from: location }
            } replace />;
        } else {
            return <Navigate to={`/login`} state={{ from: location }
            } replace />;
        }
    }

    return children;
};

export const RequireGuest = ({ children }) => {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const location = useLocation();
    const [check, setCheck] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token") || getCookie("token");
        api.defaults.headers.common["Authorization"] = "Bearer " + token;
        if (!user && !check) {
            if (token) {
                api.get("/me").then((res) => {
                    if (res.status && res.data.user) {
                        dispatch(login(res.data.user));
                        setCheck(true);
                    } else {
                        localStorage.removeItem("token");
                        deleteCookie("token");
                        setCheck(true);
                    }
                });
            } else {
                setCheck(true);
            }
        }
    }, [check, user, dispatch]);

    if (!user && !check) {
        return <LoadingScreen />;
    }
    if (user) {
        return <Navigate to='/' state={{ from: location }
        } replace />;
    }
    return children;
};
