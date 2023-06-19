export default function ThubnailText(props) {
  if (props.text.length > 18) {
    return (
      <span>{props.text.substring(0, 18)}...</span>
    )
  } else {
    return (
      <span>{props.text}</span>
    )
  }
}