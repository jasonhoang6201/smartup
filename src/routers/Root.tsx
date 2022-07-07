import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CheckAuth } from 'src/Auth'
import Authenticated from './Authed'

type Props = {}

const Root = (props: Props) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="*"
                    element={
                        <CheckAuth>
                            <Authenticated />
                        </CheckAuth>
                    }
                />
                <Route path="*" element={<Navigate to={`/`} replace />} />
            </Routes >
        </BrowserRouter>
    )
}

export default Root