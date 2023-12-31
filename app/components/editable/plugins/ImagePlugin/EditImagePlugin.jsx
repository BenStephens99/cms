'use client'
import Image from "next/image"
import { useState } from "react"
import FileManager from "@/app/components/fileManager/FileManager"
import getFileUrl from "@/app/api/firebase/database/getFileUrl"
import './imagePlugin.scss'
import placeHolderImage from '@/app/assets/images/placeholder-image.png'
import { getImageData } from "@/app/common"

export default function EditImagePlugin(props) {

  const [url, setUrl] = useState(props.content.url)

  const [fileManagerOpen, setFileManagerOpen] = useState(false)

  const closeFileManager = () => {
    setFileManagerOpen(false)
  }

  const onFileClick = async (file) => {
    setFileManagerOpen(false)
    const downloadURL = await getFileUrl(file)
    setUrl(downloadURL)
    getImageData(downloadURL, function(result) {
      props.setContent((prevContent) => ({
        ...prevContent,
        url: downloadURL,
        width: result.width,
        height: result.height
      }))
    });
  }

  const clearContent = () => {
    setUrl('')
    props.setContent((prevContent) => ({
      ...prevContent,
      url: '',
      alt: '',
      width: '',
      height: ''
    }))
  }

  return (
    <div className="edit-image-plugin">
      <FileManager openState={fileManagerOpen} close={closeFileManager} onFileClick={onFileClick} />
      <button className="btn btn-danger clear" onClick={clearContent}>Clear</button>
      <div className="input-group">
        <span className="input-group-text">Image</span>
        <Image
          className="form-control"
          src={url ? url : placeHolderImage}
          alt={url}
          width={0}
          height={0}
          sizes="400px"
          style={{ width: '100px', height: 'auto', margin: 'auto' }}
          onClick={(e) => setFileManagerOpen(e, true)}
        />
      </div>

      <div className="input-group">
        <span className="input-group-text">alt text</span>
        <textarea
          className="form-control"
          aria-label="With textarea"
          id={props.id}
          defaultValue={props.content.alt}
          onChange={(e) =>
            props.setContent((prevContent) => ({
              ...prevContent,
              alt: e.target.value,
            }))
          }
        ></textarea>
      </div>

    </div>

  );
}
