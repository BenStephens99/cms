'use client'
import { useEffect, useState } from "react"
import EditTextPlugin from "./plugins/TextPlugin/EditTextPlugin"
import EditImagePlugin from "./plugins/ImagePlugin/EditImagePlugin"
import { X } from "react-bootstrap-icons"
import updateDocument from "@/app/api/firebase/database/updateDocument"
import { useRouter } from "next/navigation"
import "./editModal.scss"
import { toast } from "react-hot-toast"
import EditImageGalleryPlugin from "./plugins/ImageGalleryPlugin/EditImageGalleryPlugin"
import deleteDocument from "@/app/api/firebase/database/deleteDocument"
import EditGalleryMenu from "./plugins/GalleryMenu/EditGalleryMenu"
import EditLinkPlugin from "./plugins/LinkPlugin/EditLinkPlugin"
import EditSocialLinks from "./plugins/SocialLinks/EditSocialLinks"

export default function EditModal(props) {
  let component = null
  let collection = 'editableSections'

  const router = useRouter()

  const [content, setContent] = useState({ ...props.content })

  const [newDocs, setNewDocs] = useState([])

  const [deletedDocs, setDeletedDocs] = useState([])

  const addNewDoc = (doc) => {
    setNewDocs((prevDocs) => [...prevDocs, doc])
  }

  const deleteDoc = (doc) => {
    setDeletedDocs((prevDocs) => [...prevDocs, doc])
  }

  useEffect(() => {
    setContent(props.content)
  }, [props.modalOpen])


  switch (props.type) {
    case "text-plugin":
      component = <EditTextPlugin id={props.id} content={content} setContent={setContent} />
      break;
    case "image-plugin":
      component = <EditImagePlugin id={props.id} content={content} setContent={setContent} />
      break;
    case "gallery-plugin":
      collection = 'gallery'
      component = <EditImageGalleryPlugin id={props.id} content={content} setContent={setContent} addNewDoc={addNewDoc} deleteDoc={deleteDoc} />
      break;
    case "gallery-menu":
      component = <EditGalleryMenu id={props.id} content={content} setContent={setContent} addNewDoc={addNewDoc} deleteDoc={deleteDoc} />
      break;
    case "link-plugin":
      component = <EditLinkPlugin id={props.id} content={content} setContent={setContent} />
      break;
    case "social-links-plugin":
      component = <EditSocialLinks id={props.id} content={content} setContent={setContent} />
      break;
    default:
      component = <p>Unknown type (check admin page for plugins that need updating)</p>
  }

  const updatePlugin = async (e) => {
    await updateDocument(collection, props.id, content)
    setNewDocs([])
    for (let doc of deletedDocs) {
      await deleteDocument(collection, doc)
    }
    setDeletedDocs([])
    await fetch("/api/revalidate")
    props.closeModal()
    router.refresh()
    toast.success("Plugin updated")
  }

  const closeModal = async (e) => {
    e.stopPropagation()
    setDeletedDocs([])
    props.closeModal()
    for (let doc of newDocs) {
      await deleteDocument(collection, doc)
    }
    setNewDocs([])
  }

  return (
    <dialog open={props.modalOpen}>
      <div className="dialog edit-modal">
        <div className="dialog-header">
          <h4>Edit Section</h4>
          <span className="close-button" onClick={closeModal}><X height={"35px"} width={"35px"} /></span>
        </div>
        <div className="dialog-body">
          {component}
        </div>
        <div className="dialog-footer">
          <button onClick={closeModal} className="btn btn-secondary">Cancel</button>
          <button onClick={updatePlugin} className="btn btn-primary">Save</button>
        </div>
      </div>
    </dialog>

  )
}
