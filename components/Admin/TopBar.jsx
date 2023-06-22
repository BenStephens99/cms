'use client'
import SignOut from "../auth/SignOut";
import { useAuthContext } from "../context/AuthContext"
import './admin.scss'
import { PlusCircle, Pencil, Person, Folder } from "react-bootstrap-icons";
import { EditModeContext } from '../context/EditContext'
import { useContext, useState } from 'react';
import FileManager from "../fileManager/FileManager";

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
                <button onClick={toggleEditMode} className={`btn icon ${editMode ? 'btn-primary': 'btn-secondary'}`}><Pencil />{editMode ? 'Edit Mode' : 'Edit Mode'}</button>
                <button onClick={toggleFileManger} className={`btn icon ${fileManagerOpen ? 'btn-primary': 'btn-secondary'}`}><Folder />File Manager</button>
                <button className="ms-auto btn icon btn-secondary"><Person />Admin Area</button>
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