import ImageGalleryPlugin from "@/components/editable/plugins/ImageGalleryPlugin/ImageGalleryPlugin"

export default async function Page({params}) {
  return (
    <div>
      <ImageGalleryPlugin id={params.id} />
    </div>
  )
}