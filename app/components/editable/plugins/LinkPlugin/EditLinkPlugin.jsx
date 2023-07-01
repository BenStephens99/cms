'use client'
import './linkPlugin.scss'

export default function EditLinkPlugin(props) {

  return (
    <div className="edit-link-plugin">
      <div className="input-group">
        <span className="input-group-text">Content</span>
        <input className="form-control" aria-label="With textarea" id={props.id} defaultValue={props.content.text} onChange={(e) => props.setContent({ text: e.target.value })}></input>
      </div>
      <div className="input-group">
        <span className="input-group-text">Link</span>
        <input className="form-control" aria-label="With textarea" id={props.id} defaultValue={props.content.url} onChange={(e) => props.setContent({ url: e.target.value })}></input>
      </div>
    </div>

  )
}