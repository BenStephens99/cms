import EditableSection from "../EditableSection";
import getDocument from "@/api/firebase/database/getDocument";

export default async function TextPlugin(props) {
  const result = await getDocument("editableSections", props.id);
  return (
    <div className="text-plugin">
      <EditableSection id={props.id} type={result?.type} content={result?.content}
        display={
          <p>{result?.content}</p>
        } />
    </div>
  );
}
