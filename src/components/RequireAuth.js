import { Navigate } from "react-router-dom";
import { checkLoggedIn, useAuth } from "./auth"

export const RequireAuth = ({ children }) => {
    const dataPromise = checkLoggedIn();
    dataPromise.then(data => {
        if (!data.user)
            return <Navigate to='/login' />
    })

    return children;
}