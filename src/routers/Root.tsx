import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { RequireAuth, RequireGuest } from 'src/Auth'
import Login from 'src/containers/Login'
import Authenticated from './Authed'

type Props = {}

const Root = (props: Props) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/login"
                    element={
                        <RequireGuest>
                            <Login />
                        </RequireGuest>
                    }
                />
                <Route
                    path="*"
                    element={
                        <RequireAuth>
                            <Authenticated />
                        </RequireAuth>
                    }
                />
                <Route path="*" element={<Navigate to={`/`} replace />} />
            </Routes >
        </BrowserRouter>
    )
}

export default Root