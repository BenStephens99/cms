export default function ConfirmModal(props) {

  const onConfirm = () => {
    props.onConfirm();
  }

  const onCancel = () => {
    props.onCancel();
  }

  return (
    <dialog open={props.openState}>
      <div className="dialog new-folder-editor" >
        <div className="dialog-header">
          <h5>{props.title}</h5>
        </div>
        <div className="dialog-body">
          <span>{props.text}</span>
        </div>
        <div className="dialog-footer">
          <button className="btn btn-secondary" onClick={onCancel}> Cancel </button>
          <button className="btn btn-primary" onClick={onConfirm}> Create </button>
        </div>
      </div>
    </dialog>

  )
}