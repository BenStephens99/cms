'use client'
import FileThumbnail from './FileThumbnail';
import FolderThumbnail from './FolderThumbnail';
import ImageThumbnail from './ImageThumbnail';
import './filesAndFolders.scss'

export default function FilesAndFolders(props) {

  const breadcrums = props.dir.split('/');

  const handleBreadcrumClick = (index) => {
    const clickedDir = breadcrums.slice(0, index + 1).join('/');
    props.onBreadcrumClick(clickedDir);
  };

  return (
    <div className='files-folders'>
      <div className='breadcrums'>
        <span className='breadcrum' onClick={() => handleBreadcrumClick('/')}>
          <span>Home</span>
        </span>
        {breadcrums.map((breadcrum, index) => (
          <span className='breadcrum' key={index} onClick={() => handleBreadcrumClick(index)}>
            <span>{breadcrum}</span>
            <span>/</span>
          </span>
        ))}
      </div>
      <div className='display'>
        {props.folders.map((folder, index) => (
          <FolderThumbnail key={index} name={folder} onClick={props.onFolderClick} />
        ))}
        {/* {props.files.map((file, index) => (
          <FileThumbnail key={index} name={file} />
        ))} */}
        {props.images.map((image, index) => (
          <ImageThumbnail key={index} name={image.name} url={image.url} />
        ))}
      </div>
    </div>
  );
}
