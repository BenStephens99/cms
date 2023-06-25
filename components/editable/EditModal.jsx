'use client'
import { useEffect, useState } from "react"
import EditTextPlugin from "./plugins/TextPlugin/EditTextPlugin"
import EditImagePlugin from "./plugins/ImagePlugin/EditImagePlugin"
import { X } from "react-bootstrap-icons"
import updateDocument from "@/api/firebase/database/updateDocument"
import { useRouter } from "next/navigation"
import "./editModal.scss"
import { toast } from "react-hot-toast"
import EditImageGalleryPlugin from "./plugins/ImageGalleryPlugin/EditImageGalleryPlugin"

export default function EditModal(props) {
  let component = null

  const router = useRouter()

  const [content, setContent] = useState(props.content)

  switch (props.type) {
    case "text-plugin":
      component = <EditTextPlugin id={props.id} content={props.content} setContent={setContent} />
      break;
    case "image-plugin":
      component = <EditImagePlugin id={props.id} content={props.content} setContent={setContent} />
      break;
    case "gallery-plugin":
      component = <EditImageGalleryPlugin id={props.id} content={props.content} setContent={setContent}/>
      break;
    default:
      component = <p>Unknown type</p>
  }

  const updatePlugin = async (e) => {
    await updateDocument("editableSections", props.id, content)
    router.refresh()
    props.closeModal()
    toast.success("Plugin updated")
  }

  return (
    <dialog open={props.modalOpen}>
      <div className="dialog edit-modal">
        <div className="dialog-header">
          <h4>Edit Section</h4>
          <span className="close-button" onClick={props.closeModal}><X height={"2em"} width={"2em"} /></span>
        </div>
        <div className="dialog-body">
          {component}
        </div>
        <div className="dialog-footer">
          <button onClick={props.closeModal} className="btn btn-secondary">Close</button>
          <button onClick={updatePlugin} className="btn btn-primary">Save</button>
        </div>
      </div>
    </dialog>

  )
}