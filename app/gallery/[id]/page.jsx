export const revalidate = 100000

import ImageGalleryPlugin from "@/app/components/editable/plugins/ImageGalleryPlugin/ImageGalleryPlugin"

export default async function Page({params}) {
  return (
    <div>
      <ImageGalleryPlugin id={params.id} />
    </div>
  )
}