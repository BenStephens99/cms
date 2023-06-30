import { Folder } from "react-bootstrap-icons";

export default function FolderThumbnail(props) {
  const handleClick = () => {
    props.onClick(props.name);
  };

  return (
    <div className="folder thumbnail" onClick={handleClick}>
      <Folder height={'3em'} width={'3em'} />
      <span>{props.name}</span>
    </div>
  );
}
