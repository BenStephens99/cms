'use client'
import { EditModeContext } from "../context/EditContext"
import { useContext, useState } from "react"
import './editableSection.scss'
import EditModal from "./EditModal"
import { useAuthContext } from "../context/AuthContext"

export default function EditableSection(props) {

  const { editMode } = useContext(EditModeContext)

  let [modalOpen, setModalOpen] = useState(false)

  const { user } = useAuthContext()

  const openModal = () => {
    if (user && editMode) {
      setModalOpen(true)
    }
  }

  const closeModal = () => { 
      setModalOpen(false) 
  }

  return (
    <>
      <EditModal id={props.id} type={props.type} modalOpen={modalOpen} content={props.content} closeModal={closeModal}/>
      <div className={`editable-section ${editMode ? 'editing' : ''}`} onClick={openModal}>
        {props.display}
      </div>
    </>

  )
}