import { Navigate } from "react-router-dom";
import { useAuth } from "./auth";
import { useEffect } from "react";

export function Logout () {
    const auth = useAuth();

    if (auth.user) {
        auth.logout()
    }
    fetch('https://api.shefoo.tech/logout', {
        method: 'GET',
        credentials: 'include',
    }).then((response) => {
        console.log(response)
        return (<Navigate to='/login' />)
    }).catch((err) => {
        console.log(err);
        return (<Navigate to='/login' />);
    })
}