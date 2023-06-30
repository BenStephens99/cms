'use client'
import React from "react";
import { useRouter } from 'next/navigation'
import { signOut, getAuth } from "firebase/auth";
import firebase_app from "@/app/api/firebase/config";
import toast from "react-hot-toast";
import { BoxArrowRight } from "react-bootstrap-icons";

export default function SignOut () {
    const auth = getAuth(firebase_app);
    const router = useRouter()
    
    const handleEvent = async (event) => { 
        event.preventDefault()

        let text = "Are you sure you want to sign out?";
        if (confirm(text)) {
            try {
                await signOut(auth)
                toast.success("Signed out")
                return router.push("/")
            } catch (error) { 
                toast.error(error.message)
                return console.error(error)  
            }
        } 
    }

    return (
        <button className="btn icon btn-danger" onClick={handleEvent}><BoxArrowRight /><span className="btn-text">Sign Out</span></button>
    )

}