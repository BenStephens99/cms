'use client'
import FileAndFolders from './components/FileAndFolders';
import './fileManager.scss'
import { X, FolderPlus, Upload, Trash } from "react-bootstrap-icons";
import { useState } from 'react';
import uploadImage from '@/api/firebase/database/uploadImage';
import createFolder from '@/api/firebase/database/createFolder';
import { deleteFolder } from '@/api/firebase/database/deleteFolder';
import { deleteFile } from '@/api/firebase/database/deleteFile';
import getAllFoldersAndFiles from '@/api/firebase/database/getAllFoldersAndFiles';
import { useEffect } from 'react';
import NewFolderEditor from './components/NewFolerEditor';

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
    if(props.openState) {
      fetchFoldersAndFiles();
      console.log('fetching folders and files');
    }
  }, [currentDir, props.openState]);

  const handleFolderClick = async (folderName) => {
    if (deleteMode) {
      await deleteFolder(`${currentDir}/${folderName}`);
      fetchFoldersAndFiles();
    } else {
      setCurrentDir(`${currentDir}/${folderName}`);
    }
  };

  const handleFileClick = async (fileName) => {
    if (deleteMode) {
      await deleteFile(`${currentDir}/${fileName}`);
      fetchFoldersAndFiles();
    } else {
      if (props.onFileClick) {
        props.onFileClick(`${currentDir}/${fileName}`);
      } else {
        return; // to add
      }
    }
  }

  const handleBreadcrumClick = (index) => {
    setCurrentDir(index);
  };

  const handleFileUpload = async () => {
    await uploadImage(currentDir);
    fetchFoldersAndFiles();
  }

  const handleNewFolder = async (name) => {
    await createFolder(`${currentDir}/${name}`);
    fetchFoldersAndFiles();
  }

  const toggleFolderEditor = () => {
    setFolderEditorOpen(!folderEditorOpen);
  }

  const toggleDeleteMode = () => {
    setDeleteMode(!deleteMode);
  }

  return (
    <dialog open={props.openState}>
      <NewFolderEditor folderEditorOpen={folderEditorOpen} toggleFolderEditor={toggleFolderEditor} createFolder={handleNewFolder} />
      <div className={`dialog file-manager ${props.onFileClick ? 'select-mode' : ''}`}>
        <div className="dialog-header">
          <h4>File Manager</h4>
          <span className="close-button" onClick={props.close}><X height={"2em"} width={"2em"} /></span>
        </div>
        <div className="dialog-body">
          <FileAndFolders deleteMode={deleteMode} dir={currentDir} images={images} files={files} folders={folders} onFileClick={handleFileClick} onFolderClick={handleFolderClick} onBreadcrumClick={handleBreadcrumClick} />
        </div>
        <div className="dialog-footer">
          <button className={`btn icon me-auto ${deleteMode ? 'btn-danger' : 'btn-secondary'}`} onClick={toggleDeleteMode}><Trash /><span className='btn-text'>Delete Mode</span></button>
          <button className="btn icon btn-primary" onClick={toggleFolderEditor}><FolderPlus /><span className='btn-text'>New Folder</span></button>
          <button className="btn icon btn-primary" onClick={() => handleFileUpload()}><Upload /><span className='btn-text'>Upload File</span></button>
          <button onClick={props.close} className="btn btn-secondary">Close</button>
        </div>
      </div>
    </dialog>
  )
}