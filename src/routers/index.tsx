import Category from "src/pages/Category";
import Home from "src/pages/Home";

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
        name: "home",
        path: "/category/:category",
        element: Category,
    },
]

export default routers;