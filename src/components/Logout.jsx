import { Navigate } from "react-router-dom";
import { checkLoggedIn } from "./auth";

export function Logout () {
    const dataPromise = checkLoggedIn()
    dataPromise.then(data => {
        if (data.user) {
            fetch('https://api.shefoo.tech/logout', {
                method: 'GET',
                credentials: 'include',
            }).then((response) => {
                console.log(response)
            }).catch((err) => {
                console.log(err);
            })
            return (<Navigate to='/login' />);
        }
    })
}
