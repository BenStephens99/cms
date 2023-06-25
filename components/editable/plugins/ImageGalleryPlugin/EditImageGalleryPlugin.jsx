'use client'

export default function EditImageGalleryPlugin(props) {

  const images = props.content.images

  return (
    <div className="edit-image-gallery">
      <div className="col">
        {images.col1.map((img) => (
          <p>{img}</p>
        ))}
      </div>
      <div className="col">
        {images.col2.map((img) => (
          <p>{img}</p>
        ))}
      </div>
      <div className="col">
        {images.col3.map((img) => (
          <p>{img}</p>
        ))}
      </div>
    </div>
  )
}