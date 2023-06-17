'use client'
import SignOut from "../../../components/auth/SignOut";
import SignIn from "../../../components/auth/SignIn";
import { useAuthContext } from "../../../components/context/AuthContext";
import './login.scss'

export default function login() {

    const { user } = useAuthContext();

    let component;

    if (user) {
        component = <SignOut />
    } else {
        component = <SignIn />
    }

    return (
        <div className="login-page">
            {component}
        </div>
    )
}