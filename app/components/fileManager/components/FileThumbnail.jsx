import { FileEarmarkText } from "react-bootstrap-icons";

export default function FileThumbnail(props) {
    return (
        <div className="file thumbnail">
            <FileEarmarkText height={'3em'} width={'3em'}/>
            <span>{props.name}</span>
        </div>
    )
}