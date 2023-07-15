import EditableSection from "../../EditableSection";
import getDocument from "@/app/api/firebase/database/getDocument";

export default async function TextPlugin(props) {
  const result = await getDocument("editableSections", props.id);
  return (
    <div className="text-plugin">
      <EditableSection id={props.id} type={result?.type} content={result?.content}
          display={
            <pre style={{ whiteSpace: "pre-wrap", font: "inherit" }}>{result?.content.text}</pre>
          }
         />
    </div>
  );
}
