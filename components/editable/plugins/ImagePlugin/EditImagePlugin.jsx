import Image from "next/image"

export default function EditImagePlugin(props) {
  return (
    <div>
      <div className="input-group">
        <span className="input-group-text">Image</span>
        <Image
          className="form-control"
          src={props.content.url}
          alt={props.content.alt}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100px', height: 'auto', margin: 'auto' }}
        />
      </div>

      <div className="input-group">
        <span className="input-group-text">alt text</span>
        <textarea
          className="form-control"
          aria-label="With textarea"
          id={props.id}
          defaultValue={props.content.alt}
          onChange={(e) =>
            props.setContent((prevContent) => ({
              ...prevContent,
              alt: e.target.value,
            }))
          }
        ></textarea>
      </div>
    </div>
  );
}
