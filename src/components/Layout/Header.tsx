import { Badge } from "antd";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import cart from "src/assets/icons/cart.svg";
import search from "src/assets/icons/search.svg";
import user from "src/assets/icons/user.svg";
import logo from "src/assets/images/logo.png";
import useRouting from "src/hooks/UseRouting";
import { User } from "src/redux/auth";
import ModalLogin from "../ModalLogin";
import "./Layout.scss";
import Search from "src/components/Search";
import cartAPI from "src/api/cart";
import { setCart } from "src/redux/cart";
import { FaTicketAlt } from "react-icons/fa";
import { HiOutlineTicket } from "react-icons/hi";
type Props = {};

const Header = (props: Props) => {
  const userState: User = useSelector((state: any) => state.auth.user);
  const cartState = useSelector((state: any) => state.cart.productLength);
  const dispatch = useDispatch();
  const [isModalLogin, setIsModalLogin] = React.useState(false);
  const navigate = useNavigate();
  const { generate } = useRouting();
  const [isSearch, setIsSearch] = React.useState(false);

  const category = useMemo(() => {
    return [
      {
        name: "All",
        link: "/category",
      },
      {
        name: "Charge",
        link: "/category/charge",
      },
      {
        name: "Case",
        link: "/category/case",
      },
      {
        name: "Headphone",
        link: "/category/headphone",
      },
      {
        name: "Tempered Glass",
        link: "/category/tempered-glass",
      },
      {
        name: "Protector",
        link: "/category/protector",
      },
      {
        name: "Other",
        link: "/category/other",
      },
    ];
  }, []);

  useEffect(() => {
    cartAPI.getCart().then((res) => {
      const products = res?.data?.product;
      if (products) {
        dispatch(setCart(products.map((item) => item.code)));
      }
    });
  }, [userState]);

  return (
    <div className="header">
      <div className="header-up">
        <div className="search" onClick={() => setIsSearch(true)}>
          <img src={search} alt="search" width={30} />
        </div>
        <Link to={"/"}>
          <div className="logo">
            <img src={logo} alt="logo" height={100} />
          </div>
        </Link>
        <div className="feature">
          {userState ? (
            <>
              <HiOutlineTicket
                className="voucher-icon"
                onClick={() => navigate(generate("voucher"))}
              />
              <Badge count={cartState.length} overflowCount={10}>
                <img
                  src={cart}
                  alt="cart"
                  width={30}
                  onClick={() => navigate(generate("cart"))}
                />
              </Badge>
              <img
                src={user}
                alt="user"
                width={30}
                onClick={() => navigate(generate("profile"))}
              />
            </>
          ) : (
            <span onClick={() => setIsModalLogin(true)}>Login/Register</span>
          )}
        </div>
      </div>
      <div className="header-down">
        <ul>
          {category.map((item, index) => (
            <li key={index}>
              <Link to={item.link}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>

      {isSearch && <Search onClose={() => setIsSearch(false)} />}
      <ModalLogin
        visible={isModalLogin}
        onCancel={() => setIsModalLogin(false)}
      />
    </div>
  );
};

export default Header;
