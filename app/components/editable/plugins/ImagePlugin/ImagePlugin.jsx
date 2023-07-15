
import getDocument from "@/app/api/firebase/database/getDocument";
import EditableSection from "../../EditableSection";
import Image from "next/image";
import placeHolderImage from "@/app/assets/images/placeholder-image.png";
import "./imagePlugin.scss";

export default async function ImagePlugin(props) {
  const result = await getDocument("editableSections", props.id);

  const alt = result?.content.alt || result?.content.url;

  const content = {
    url: result?.content.url,
    alt: alt,
  }

  return (
      <EditableSection id={props.id} type={result?.type} content={content}
        display={
          <a href={result?.content?.url} target="_blank" rel="noreferrer" style={{ cursor: 'pointer' }}>
            <Image
              src={result?.content.url ? result?.content.url : placeHolderImage}
              className={result?.content.url ? '' : 'placeholderImage'}
              alt={alt}
              width={0}
              height={0}
              sizes="(max-width: 1920px) 500px, 420px"
              style={{ width: '100%', height: 'auto' }} 
            />
          </a>
        } />
  );
}
