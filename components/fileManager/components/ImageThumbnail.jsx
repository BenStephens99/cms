import Image from "next/image"

export default function ImageThumbnail(props) {
    return (
        <div className="image thumbnail">
            <div className="image-container">
                <Image src={props.url} fill={true} style={{ objectFit: "contain" }} />
            </div>

            <span className="name">{props.name}</span>
        </div>
    )
}