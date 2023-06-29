'use client'
import Link from "next/link"
import Image from "next/image"
import PagesEditor from "../../../PagesEditor/PagesEditor"
import './galleryMenu.scss'
import { useState } from "react"
import FileManager from "@/components/fileManager/FileManager"
import getFileUrl from "@/api/firebase/database/getFileUrl"
import { PlusLg } from "react-bootstrap-icons"

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

  const addItem = () => {
    items.push({
      image: '',
      url: '',
      text: '',
    })

    updateContent()
  }

  return (
    <>
      <PagesEditor id='gallery' setSelectedUrl={setSelectedUrl} selectedUrl={selectedUrl}/>
      <div className="edit-gallery-menu">
      <FileManager openState={fileManagerOpen} close={closeFileManager} onFileClick={onFileClick}/>
        {items.map((item) => (
          <Image src={item.image} width={180} height={180} alt={item.image} onClick={selectImage}/>
        ))}
        <div className="place-holder" onClick={addItem}><PlusLg height={'3em'} width={'3em'}/></div>
      </div>
    </>
  )
}