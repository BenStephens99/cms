import Image from "next/image"
import ThubnailText from "./ThumbnailText"

export default function ImageThumbnail(props) {

    const handleClick = () => {
        props.onClick(props.name);
    };

    return (
        <div onClick={handleClick} className="image thumbnail">
            <div className="image-container">
                <Image src={props.url} alt={props.name} fill={true} sizes="100px" style={{ objectFit: "contain" }} />
            </div>

            <ThubnailText text={props.name} />
        </div>
    )
}