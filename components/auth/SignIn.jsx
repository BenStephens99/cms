'use client'
import React from "react";
import signIn from "@/api/firebase/auth/signIn";
import { useRouter } from 'next/navigation'
import toast from "react-hot-toast";


export default function SignIn() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const router = useRouter()

    const handleForm = async (event) => {
        event.preventDefault()

        const { result, error } = await signIn(email, password);

        if (error) {
            switch (error.code) {
                case "auth/user-not-found":
                    toast.error("User not found")
                    break;
                case "auth/wrong-password":
                    toast.error("Incorrect password")
                    break;
                default:
                    toast.error(error.message)
                    break;
            }
        } else {
            toast.success("Signed in")
            return router.push("/")
        }


    }
    return (
        <form onSubmit={handleForm}>
            <h5>Sign in</h5>
            <fieldset>
                <div>
                    <label htmlFor="email">Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="example@mail.com" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="password" />
                </div>
            </fieldset>
            <button className="btn btn-primary" type="submit">Sign in</button>
        </form>
    );
}