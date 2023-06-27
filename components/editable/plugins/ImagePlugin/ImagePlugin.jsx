import EditableSection from "../../EditableSection";
import getDocument from "@/api/firebase/database/getDocument";
import Image from "next/image";
import placeHolderImage from '@/assets/images/placeholder-image.png'

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
              alt={alt}
              width={0}
              height={0}
              sizes="300px"
              style={{ width: '100%', height: 'auto' }} 
            />
          </a>
        } />
  );
}
