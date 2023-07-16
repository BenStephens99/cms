import EditableSection from "../../EditableSection";
import getDocument from "@/app/api/firebase/database/getDocument";
import Link from "next/link";
import { Instagram, Facebook, Linkedin, Twitter } from "react-bootstrap-icons";

export default async function SocialLinksPlugin(props) {
  const result = await getDocument("editableSections", props.id);

  let content = { ...result?.content }

  return (
    <div className="social-links-plugin">
      <EditableSection
        id={props.id}
        type={result?.type}
        content={result?.content}
        display={
          <div className="social-links">
            {Object?.entries(content).map(([key, value]) => {
              if (value.active) {
                let IconComponent;

                switch (key) {
                  case "instagram":
                    IconComponent = Instagram;
                    break;
                  case "facebook":
                    IconComponent = Facebook;
                    break;
                  case "linkedin":
                    IconComponent = Linkedin;
                    break;
                    case "twitter":
                    IconComponent = Twitter;
                    break;
                  default:
                    break;
                }
                if (IconComponent) {
                  return (
                    <Link className="social-link" href={value.link} target="_blank" rel="noreferrer" key={key}>
                        <IconComponent width={'1.5em'} height={'1.5em'}/>
                    </Link>
                  );
                }
              }
              return null;
            })}
          </div>
        }
      />
    </div>
  );
}
