'use client'
import SignOut from "../auth/SignOut";
import { useAuthContext } from "../context/AuthContext"
import './admin.scss'
import { PlusCircle, Pencil, Person, Folder } from "react-bootstrap-icons";
import { EditModeContext } from '../context/EditContext'
import { useContext, useState } from 'react';
import FileManager from "../fileManager/FileManager";
import Link from "next/link";

export default function TopBar() {

    const { user } = useAuthContext();

    const { editMode, toggleEditMode } = useContext(EditModeContext)

    const [fileManagerOpen, setFileManagerOpen] = useState(false)

    const toggleFileManger = () => { 
        setFileManagerOpen(!fileManagerOpen)
    }

    const closeFileManager = () => {
        setFileManagerOpen(false)
    }

    if (user) {
        return (
            <>
            <div className="admin-section top-bar">
                {/* <button className="btn icon btn-primary"><PlusCircle /> Add Section</button> */}
                <button onClick={toggleEditMode} className={`btn icon ${editMode ? 'btn-primary': 'btn-secondary'}`}><Pencil /><span className="btn-text">{editMode ? 'Edit Mode' : 'Edit Mode'}</span></button>
                <button onClick={toggleFileManger} className={`btn icon ${fileManagerOpen ? 'btn-primary': 'btn-secondary'}`}><Folder /><span className="btn-text">File Manager</span></button>
                <Link className="admin-btn" href={'/admin'}><button className="btn icon btn-secondary"><Person /><span className="btn-text">Admin Area</span></button></Link>
                <SignOut />
            </div>
            <FileManager openState={fileManagerOpen} close={closeFileManager}/> 
            </>
        )   
    }

    return ( 
        <></>
    )
}