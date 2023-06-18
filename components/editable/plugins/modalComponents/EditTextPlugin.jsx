'use client'
export default function EditTextPlugin(props) {

  return (
    <div class="input-group">
      <span class="input-group-text">Content</span>
      <textarea class="form-control" aria-label="With textarea" id={props.id} defaultValue={props.content} onChange={(e) => props.setContent(e.target.value)}></textarea>
    </div>
  )
}