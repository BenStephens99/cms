import EditableSection from "../../EditableSection";
import getDocument from "@/app/api/firebase/database/getDocument";
import Link from "next/link";

export default async function LinkPlugin(props) {
  const result = await getDocument("editableSections", props.id);
  return (
    <div className="link-plugin">
      <EditableSection id={props.id} type={result?.type} content={result?.content}
        display={
          <Link href={result?.content?.url || '/'} style={{ cursor: 'pointer' }}>
            <>{result?.content.text}</>
          </Link>
        } />
    </div>
  );
}
