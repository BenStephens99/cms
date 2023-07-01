export const revalidate = 60 * 60;
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
          <div className="image-column">
            {images.col1.map((img) => (
              <ImagePlugin key={img} id={img} />
            ))}
          </div>
          <div className="image-column">
            {images.col2.map((img) => (
              <ImagePlugin key={img} id={img} />
            ))}
          </div>
          <div className="image-column">
            {images.col3.map((img) => (
              <ImagePlugin key={img} id={img} />
            ))}
          </div>
        </div>
      }
    />
  );
}
