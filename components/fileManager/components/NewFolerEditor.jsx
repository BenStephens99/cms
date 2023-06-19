'use client'
import { useState } from "react"
import { toast } from "react-hot-toast"

export default function NewFolderEditor(props) {

  const [folderName, setFolderName] = useState("")

  const handleCreate = async () => {
    if (folderName !== "") {
      await props.createFolder(folderName)
      props.toggleFolderEditor()
    } else {
      toast.error("Please enter a folder name")
    }
  }

  return (
    <dialog open={props.folderEditorOpen}>
      <div className="dialog new-folder-editor" >
        <div className="dialog-header">
          <h5>New Folder</h5>
        </div>
        <div className="dialog-body">
          <div class="input-group">
            <span class="input-group-text">Name</span>
            <input type="text" class="form-control" placeholder="Background Images" onChange={(e) => setFolderName(e.target.value)} />
          </div>
        </div>
        <div className="dialog-footer">
          <button className="btn btn-secondary" onClick={props.toggleFolderEditor}> Cancel </button>
          <button className="btn btn-primary" onClick={handleCreate}> Create </button>
        </div>
      </div>
    </dialog>
  )
}
