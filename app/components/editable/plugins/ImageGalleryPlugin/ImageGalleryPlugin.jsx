
import getDocument from "@/app/api/firebase/database/getDocument";
import EditableSection from "../../EditableSection";
import ImagePlugin from "../ImagePlugin/ImagePlugin";
import './imageGallery.scss'

export default async function ImageGalleryPlugin(props) {
  const result = await getDocument("gallery", props.id);

  const images = result.content.images

  return (
    <EditableSection
      id={props.id}
      type={result?.type}
      content={result?.content}
      display={
        <div className="image-gallery">
          {Object.keys(images)
            .sort()
            .map((colKey) => (
              <div className="image-column" key={colKey}>
                {images[colKey].map((img) => (
                  <ImagePlugin key={img} id={img} />
                ))}
              </div>
            ))}
        </div>
      }
    />
  );
}
