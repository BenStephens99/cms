'use client'
import Link from "next/link"
import Image from "next/image"
import PagesEditor from "../../../PagesEditor/PagesEditor"
import './galleryMenu.scss'
import { useState } from "react"

export default function EditGalleryMenu(props) {

  const items = props.content.items

  const [selectedUrl, setSelectedUrl] = useState(0)

  const updateContent = () => {
    props.setContent((prevContent) => ({
      ...prevContent,
      items: items
    }))
  }

  return (
    <>
      <PagesEditor id='gallery' setSelectedUrl={setSelectedUrl} selectedUrl={selectedUrl}/>
      <div className="edit-gallery-menu">
        {items.map((item) => (
          <Image src={item.image} width={200} height={200} alt={item.image} />
        ))}
      </div>
    </>
  )
}