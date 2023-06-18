'use client'
import FileAndFolders from './components/FileAndFolders';
import './fileManager.scss'
import { X } from "react-bootstrap-icons";
import { useState } from 'react';

export default function FileManager(props) {

  const [currentDir, setCurrentDir] = useState("/")

  return (
    <dialog open={props.openState}>
      <div className="dialog file-manager">
        <div className="dialog-header">
          <h4>File Manager</h4>
          <span className="close-button" onClick={props.close}><X height={"2em"} width={"2em"} /></span>
        </div>
        <div className="dialog-body">
          <FileAndFolders dir={currentDir} />
        </div>
        <div className="dialog-footer">
          <button onClick={props.close} className="btn btn-secondary">Close</button>
          <button className="btn btn-primary">Save</button>
        </div>
      </div>
    </dialog>
  )
}