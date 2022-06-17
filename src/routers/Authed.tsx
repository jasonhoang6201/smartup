import { Route, Routes, Navigate } from "react-router-dom";
import router from './index'
import useRouting from "src/hooks/UseRouting";

const Authed = () => {
    const { generate } = useRouting()

    return (
        <>
            {
                <Routes>
                    {router.map((item, idx) =>
                        <Route
                            key={idx}
                            path={item.path}
                            element={<item.element />}
                        />
                    )}
                    <Route path="*" element={<Navigate to={generate("not-found")} />} />
                </Routes>
            }
        </>
    );
};

export default Authed;
