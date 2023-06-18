import { Folder2 } from "react-bootstrap-icons"

export default function Folder (props) {
    return (
        <div className="folder">
            <Folder2 height={'3em'} width={'3em'}/>
            <p>{props.name}</p>
        </div>
    )
}