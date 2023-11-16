'use client'
import { EditModeContext } from "../context/EditContext"
import { useContext, useState } from "react"
import './editableSection.scss'
import EditModal from "./EditModal"
import { useAuthContext } from "../context/AuthContext"

export default function EditableSection(props) {

  const { editMode, closeEditMode, openEditMode } = useContext(EditModeContext)

  let [modalOpen, setModalOpen] = useState(false)

  const { user } = useAuthContext()

  const openModal = (e) => {
    e.stopPropagation()
    closeEditMode()
    if (user && editMode) {
      setModalOpen(true)
    }
  }

  const closeModal = (e) => {
    openEditMode()
    if (e) {
      e.stopPropagation()
    }
    setModalOpen(false)
  }

  if (user) {
    return (
      <>
        <EditModal id={props.id} type={props.type} modalOpen={modalOpen} content={props.content} closeModal={closeModal}/>
        <div className={`editable-section ${editMode ? 'editing' : ''}`} onClick={openModal}>
          {props.display}
        </div>
      </>
    )
  } else {
    return (
      <>
        {props.display}
      </>
    )
  }
}