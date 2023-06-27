'use client'
import Link from "next/link"
import Image from "next/image"
import PagesEditor from "../../../PagesEditor/PagesEditor"

export default function EditGalleryMenu(props) {

  const items = props.content.items
  
  const updateContent = () => {
    props.setContent((prevContent) => ({
      ...prevContent,
      items: items
    }))
  }

  return (
    <div>
      <PagesEditor id='galleries' />
       {items.map((item) => (
              <Image src={item.image} width={200} height={200} alt={item.image} />
          ))}
    </div>
  )
}