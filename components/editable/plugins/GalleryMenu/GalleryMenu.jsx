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
            <Link href={item.url}>
              <Image src={item.image} width={400} height={400} alt={item.image} />
            </Link>
          ))}
        </div>
      }
    />
  )
}