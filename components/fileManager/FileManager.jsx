'use client'
import FileAndFolders from './components/FileAndFolders';
import './fileManager.scss'
import { X, FolderPlus, Upload, Trash } from "react-bootstrap-icons";
import { useState } from 'react';
import uploadImage from '@/api/firebase/database/uploadImage';
import createFolder from '@/api/firebase/database/createFolder';
import getAllFoldersAndFiles from '@/api/firebase/database/getAllFoldersAndFiles';
import { useEffect } from 'react';
import NewFolderEditor from './components/NewFolerEditor';
import { toast } from 'react-hot-toast';

export default function FileManager(props) {

  const [currentDir, setCurrentDir] = useState("");

  const [folderEditorOpen, setFolderEditorOpen] = useState(false);

  const [deleteMode, setDeleteMode] = useState(false);

  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);

  const fetchFoldersAndFiles = async () => {
    const { folders, files, images } = await getAllFoldersAndFiles(currentDir);
    setFolders(folders);
    setFiles(files);
    setImages(images);
  };

  useEffect(() => {
    fetchFoldersAndFiles();
  }, [currentDir]);

  const handleFolderClick = (folderName) => {
    setCurrentDir(`${currentDir}/${folderName}`);
  };

  const handleBreadcrumClick = (index) => {
    setCurrentDir(index);
  };

  const handleFileUpload = async () => { 
    await uploadImage(currentDir);
    fetchFoldersAndFiles();
  }

  const handleNewFolder = async (name) => { 
    await createFolder(`${currentDir}/${name}`);
    toast.success(`${name} created`)
    await fetchFoldersAndFiles();
  }

  const toggleFolderEditor = () => {
    setFolderEditorOpen(!folderEditorOpen);
  }

  const toggleDeleteMode = () => {
    setDeleteMode(!deleteMode);
  }

  return (
    <dialog open={props.openState}>
      <NewFolderEditor folderEditorOpen={folderEditorOpen} toggleFolderEditor={toggleFolderEditor} createFolder={handleNewFolder}/>
      <div className="dialog file-manager">
        <div className="dialog-header">
          <h4>File Manager</h4>
          <span className="close-button" onClick={props.close}><X height={"2em"} width={"2em"} /></span>
        </div>
        <div className="dialog-body">
          <FileAndFolders dir={currentDir} images={images} files={files} folders={folders} onFolderClick={handleFolderClick} onBreadcrumClick={handleBreadcrumClick} />
        </div>
        <div className="dialog-footer">
          <button className={`btn icon me-auto ${deleteMode ? 'btn-danger' : 'btn-secondary'}`} onClick={toggleDeleteMode}><Trash />Delete Mode</button>
          <button className="btn icon btn-primary" onClick={toggleFolderEditor}><FolderPlus />New Folder</button>
          <button className="btn icon btn-primary" onClick={() => handleFileUpload()}><Upload />Upload File</button>
          <button onClick={props.close} className="btn btn-secondary">Close</button>
        </div>
      </div>
    </dialog>
  )
}