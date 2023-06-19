import Image from "next/image"
import ThubnailText from "./ThumbnailText"

export default function ImageThumbnail(props) {
    return (
        <div className="image thumbnail">
            <div className="image-container">
                <Image src={props.url} alt={props.name} fill={true} style={{ objectFit: "contain" }} />
            </div>

            <ThubnailText text={props.name} />
        </div>
    )
}