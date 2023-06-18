import { useEffect, useState } from 'react';
import getAllFoldersAndFiles from '@/api/firebase/database/getAllFoldersAndFiles';
import File from './File';
import Folder from './Folder';
import './filesAndFolders.scss'

export default function FilesAndFolders(props) {
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFoldersAndFiles = async () => {
      const { folders, files } = await getAllFoldersAndFiles(props.dir);
      setFolders(folders);
      setFiles(files);
    };

    fetchFoldersAndFiles();
  }, [props.dir]);



  return (
    <div className='files-folders'>
      <div className='directory'>
        <h4>{props.dir}</h4>
      </div>
      <div className='display'>
        {folders.map((folder, index) => (
          <Folder key={index} name={folder} />
        ))}
        {files.map((file, index) => (
          <File key={index} name={file} />
        ))}
      </div>
    </div>
  );
}