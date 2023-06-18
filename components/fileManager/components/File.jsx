import { FileEarmarkText } from "react-bootstrap-icons";

export default function File(props) {
    return (
        <div className="file">
            <FileEarmarkText height={'3em'} width={'3em'}/>
            <p>{props.name}</p>
        </div>
    )
}