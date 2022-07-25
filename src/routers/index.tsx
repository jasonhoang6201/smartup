import Cart from "src/pages/Cart";
import Category from "src/pages/Category";
import Home from "src/pages/Home";
import ProductDetail from "src/pages/ProductDetail";
import Profile from "src/pages/Profile";
import SearchResult from "src/pages/SearchResult";
import Voucher from "src/pages/Voucher";

export interface Routers {
  name: string;
  path: string;
  element: React.ElementType;
}

const routers: Routers[] = [
  {
    name: "home",
    path: "/",
    element: Home,
  },
  {
    name: "profile",
    path: "/profile",
    element: Profile,
  },
  {
    name: "category",
    path: "/category",
    element: Category,
  },
  {
    name: "category",
    path: "/category/:category",
    element: Category,
  },
  {
    name: "product",
    path: "/product/:id",
    element: ProductDetail,
  },
  {
    name: "cart",
    path: "/cart",
    element: Cart,
  },
  {
    name: "Search",
    path: "/Search",
    element: SearchResult,
  },
  {
    name: "voucher",
    path: "/voucher",
    element: Voucher,
  },
];

export default routers;
