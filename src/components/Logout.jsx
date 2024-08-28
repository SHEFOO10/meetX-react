import { useNavigate } from "react-router-dom";
import { checkLoggedIn } from "./auth";

export function Logout () {
    const navigate = useNavigate();
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
            navigate('/login');
        }
    })
}
