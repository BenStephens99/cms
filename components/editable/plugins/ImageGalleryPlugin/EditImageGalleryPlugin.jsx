'use client'
import './imageGallery.scss'
import addData from '@/api/firebase/database/addData'

export default function EditImageGalleryPlugin(props) {

  let images = props.content.images

  const updateContent = () => {
    props.setContent((prevContent) => ({
      ...prevContent,
      images: images
    }))
  }

  return (
    <div className="edit-image-gallery">
      <EditGalleryColumn images={images.col1} updateContent={updateContent} deleteDoc={props.deleteDoc} addNewDoc={props.addNewDoc}/>
      <EditGalleryColumn images={images.col2} updateContent={updateContent} deleteDoc={props.deleteDoc} addNewDoc={props.addNewDoc}/>
      <EditGalleryColumn images={images.col3} updateContent={updateContent} deleteDoc={props.deleteDoc} addNewDoc={props.addNewDoc}/>
    </div>
  )
}

function EditGalleryColumn(props) {
  
  const addImage = async () => {
    const newImage = {
      type: 'image-plugin',
      content: {
        url: '',
        alt: ''
      }
    }
    const result = await addData('editableSections', newImage)
    props.images.push(result.result)
    props.addNewDoc(result.result)
    props.updateContent()
  }

  const deleteImage = (img) => {
    props.images.splice(props.images.indexOf(img), 1)
    props.deleteDoc(img)
    props.updateContent()
  }

  return (
    <div className="edit-gallery-column">
      {props.images.map((img) => (
        <div key={img} className='thumb'>
          <p>{img}</p>
          <button onClick={() => deleteImage(img)} className='btn btn-danger'>Delete</button>
        </div>
      ))}
      <button onClick={() => addImage(props.col)} className='btn btn-primary add-image'>Add Image</button>
    </div>
  )
}