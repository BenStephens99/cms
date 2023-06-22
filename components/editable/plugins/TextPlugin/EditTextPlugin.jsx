'use client'
export default function EditTextPlugin(props) {

  return (
    <div className="input-group">
      <span className="input-group-text">Content</span>
      <textarea className="form-control" aria-label="With textarea" id={props.id} defaultValue={props.content.text} onChange={(e) => props.setContent({text: e.target.value})}></textarea>
    </div>
  )
}