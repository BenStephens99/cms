'use client'
import SignOut from "@/app/components/auth/SignOut";
import SignIn from "@/app/components/auth/SignIn";
import { useAuthContext } from "@/app/components/context/AuthContext";
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