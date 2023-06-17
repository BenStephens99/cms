'use client'
import SignOut from "../auth/SignOut";
import { useAuthContext } from "../context/AuthContext"
import './admin.scss'
import { PlusCircle, Pencil, Person } from "react-bootstrap-icons";
import { EditModeContext } from '../context/EditContext'
import { useContext } from 'react';

export default function TopBar() {

    const { user } = useAuthContext();

    const { editMode, toggleEditMode } = useContext(EditModeContext)

    if (user) {
        return (
            <div className="admin-section top-bar">
                {/* <button className="btn icon btn-primary"><PlusCircle /> Add Section</button> */}
                <button onClick={toggleEditMode} className={`btn icon ${editMode ? 'btn-primary': 'btn-secondary'}`}><Pencil />{editMode ? 'Editing' : 'Edit'}</button>
                <button className="ms-auto btn icon btn-secondary"><Person />Admin Area</button>
                <SignOut />
            </div>
        )   
    }

    return ( 
        <></>
    )
}