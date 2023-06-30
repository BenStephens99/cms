'use client'
import Link from "next/link"
import Image from "next/image"
import PagesEditor from "../../../PagesEditor/PagesEditor"
import './galleryMenu.scss'
import { useState } from "react"
import FileManager from "@/components/fileManager/FileManager"
import getFileUrl from "@/api/firebase/database/getFileUrl"
import { PlusLg } from "react-bootstrap-icons"
import { X } from "react-bootstrap-icons"

export default function EditGalleryMenu(props) {

  const items = props.content.items

  const [selectedUrl, setSelectedUrl] = useState(0)

  const [fileManagerOpen, setFileManagerOpen] = useState(false)

  const [selectedItem, setSelectedItem] = useState(0)

  const onFileClick = async (path) => {
    const url = await getFileUrl(path)
    selectedItem.image = url
    setFileManagerOpen(false)
    setSelectedItem(null)
    updateContent()
  }

  const updateContent = () => {
    props.setContent((prevContent) => ({
      ...prevContent,
      items: items
    }))
  }

  const closeFileManager = () => {
    setFileManagerOpen(false)
    setSelectedItem(null)
  }

  const selectImage = (index) => {
    setFileManagerOpen(true)
    setSelectedItem(items[index])
  }

  const selectUrl = (index) => {
    setSelectedItem(items[index])
    if (selectedUrl) {
      items[index].url = selectedUrl
      updateContent()
      setSelectedItem(null)
      setSelectedUrl(null)
    }
  }


  const addItem = () => {
    items.push({
      image: '',
      url: '',
      text: '',
    })

    updateContent()
  }

  const removeItem = (index) => {
    items.splice(index, 1)
    updateContent()
  }

  const updateText = (index, text) => {
    items[index].text = text
    updateContent()
  }

  return (
    <>
      <PagesEditor id='gallery' setSelectedUrl={setSelectedUrl} selectedUrl={selectedUrl} />
      <div className="edit-gallery-menu">
        <FileManager openState={fileManagerOpen} close={closeFileManager} onFileClick={onFileClick} />
        {items.map((item, index) => (
          <div className="item" key={index}>
            <button onClick={() => removeItem(index)} className='delete-image'><X height={"1.5em"} width={"1.5em"} /></button>
            <div className="inputs">
              <input type="text" placeholder="Text" class="form-control" value={item.text} onChange={(e) => updateText(index, e.target.value)} />
              <div className="url-selector form-control" onClick={() => selectUrl(index)}>{item.url}URL</div> 
            </div>
            <Image src={item.image} width={250} height={250} alt={item.image} style={{ objectFit: "cover", objectPosition: "100% center" }}  onClick={() => selectImage(index)} />
          </div>
        ))}
        <div className="place-holder" onClick={addItem}><PlusLg height={'3em'} width={'3em'} /></div>
      </div>
    </>
  )
}