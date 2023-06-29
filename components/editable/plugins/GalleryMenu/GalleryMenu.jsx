import EditableSection from "../../EditableSection"
import getDocument from "@/api/firebase/database/getDocument"
import Link from "next/link"
import Image from "next/image"

export default async function GalleryMenu(props) {
  const result = await getDocument("editableSections", props.id)

  return (
    <EditableSection
      id={props.id}
      type={result?.type}
      content={result?.content}
      display={
        <div className="gallery-menu">
          {result?.content?.items?.map((item) => (
            <div className="item">
              <h2 className="title">{item.text}</h2>
              <Image
                src={item.image}
                alt={item.url}
                width={0}
                height={0}
                sizes="350px"
              />
            </div>
          ))}
        </div>
      }
    />
  )
}
