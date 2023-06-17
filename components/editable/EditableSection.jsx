'use client'
import { EditModeContext } from "../context/EditContext"
import { useContext, useState } from "react"
import './editableSection.scss'
import EditModal from "./EditModal"

export default function EditableSection(props) {

  const { editMode } = useContext(EditModeContext)

  let [modalOpen, setModalOpen] = useState(false)

  const toggleModalOpen = () => {
    setModalOpen(!modalOpen)
  }

  return (
    <>
      <EditModal modalOpen={modalOpen} />
      <div className={`editable-section ${editMode ? 'editing' : ''}`} onClick={toggleModalOpen}>
        {props.content}
      </div>
    </>

  )
}