'use client'
import { useAuthContext } from '../context/AuthContext';
import './admin.scss'

export default function SideBar() {

    const { user } = useAuthContext();

    if (user) {
        return (
            <div className="admin-section side-bar">
                
            </div>
        )   
    }

    return ( 
        <></>
    )
}