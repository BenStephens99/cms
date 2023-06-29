'use client'
import Link from "next/link"
import Image from "next/image"
import PagesEditor from "../../../PagesEditor/PagesEditor"
import './galleryMenu.scss'
import { useState } from "react"
import FileManager from "@/components/fileManager/FileManager"
import getFileUrl from "@/api/firebase/database/getFileUrl"

export default function EditGalleryMenu(props) {

  const items = props.content.items

  const [selectedUrl, setSelectedUrl] = useState(0)

  const [fileManagerOpen, setFileManagerOpen] = useState(false)

  const [selectedImage, setSelectedImage] = useState('')

  const onFileClick = async (path) => {
   const url = await getFileUrl(path)
    setSelectedImage(url)
  }

  const updateContent = () => {
    props.setContent((prevContent) => ({
      ...prevContent,
      items: items
    }))
  }

  const closeFileManager = () => {
    setFileManagerOpen(false)
  }

  const selectImage = () => {
    setFileManagerOpen(true)
  }


  return (
    <>
      <PagesEditor id='gallery' setSelectedUrl={setSelectedUrl} selectedUrl={selectedUrl}/>
      <div className="edit-gallery-menu">
      <FileManager openState={fileManagerOpen} close={closeFileManager} onFileClick={onFileClick}/>
        {items.map((item) => (
          <Image src={item.image} width={200} height={200} alt={item.image} onClick={selectImage}/>
        ))}
      </div>
    </>
  )
}