import getAllDocumentNames from "@/app/api/firebase/database/getAllDocumentNames"
import ImageGalleryPlugin from "@/app/components/editable/plugins/ImageGalleryPlugin/ImageGalleryPlugin"

export async function generateStaticParams() {
  const galleries = await getAllDocumentNames("gallery")
 
  return galleries.map((gallery) => ({
    slug: gallery,
  }))
}

export default async function Page({params}) {

  return (
    <div>
      <ImageGalleryPlugin id={params.id}/>
    </div>
  )
}