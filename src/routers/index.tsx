import Category from "src/pages/Category";
import Home from "src/pages/Home";
import ProductDetail from "src/pages/ProductDetail";

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
        name: "category",
        path: "/category/:category",
        element: Category,
    },
    {
        name: "product",
        path: "/product/:id",
        element: ProductDetail,
    },
]

export default routers;