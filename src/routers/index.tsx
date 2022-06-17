import Home from "src/containers/Home";

export interface Routers {
    name: string;
    path: string;
    element: any;
}

const routers: Routers[] = [
    {
        name: "home",
        path: "/",
        element: Home,
    },
]

export default routers;