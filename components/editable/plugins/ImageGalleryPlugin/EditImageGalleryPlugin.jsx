'use client'
import './imageGallery.scss'
import addData from '@/api/firebase/database/addData'
import Image from 'next/image'
import getDocument from '@/api/firebase/database/getDocument'
import { useState, useEffect } from 'react'
import placeHolderImage from '@/assets/images/placeholder-image.png'

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
      {Object.keys(images)
        .sort((a, b) => Number(a.replace('col', '')) - Number(b.replace('col', '')))
        .map((key) => (
          <EditGalleryColumn
            key={key}
            images={images[key]}
            updateContent={updateContent}
            deleteDoc={props.deleteDoc}
            addNewDoc={props.addNewDoc}
          />
        ))}
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
          <ImageThumb id={img} />
          <button onClick={() => deleteImage(img)} className='btn btn-danger'>Delete</button>
        </div>
      ))}
      <button onClick={() => addImage(props.col)} className='btn btn-primary add-image'>Add Image</button>
    </div>
  )
}

function ImageThumb(props) {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const document = await getDocument("editableSections", props.id);
      setResult(document);
    };

    fetchData();
  }, [props.id]);

  return (
    <Image src={result?.content?.url ? result.content.url : placeHolderImage} alt={result?.content?.alt} width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
  );
}