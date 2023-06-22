import EditableSection from "../../EditableSection";
import getDocument from "@/api/firebase/database/getDocument";
import Image from "next/image";

export default async function ImagePlugin(props) {
  const result = await getDocument("editableSections", props.id);

  const alt = result?.content.alt || result?.content.url;

  const content = {
    url: result?.content.url,
    alt: alt,
  }

  return (
    <div className="image-plugin">
      <EditableSection id={props.id} type={result?.type} content={content}
        display={
          <Image
            src={result?.content.url}
            alt={alt}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }} 
          />
        } />
    </div>
  );
}
