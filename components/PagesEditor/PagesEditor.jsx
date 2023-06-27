'use client'

import { useEffect, useState } from "react";
import getDocument from "@/api/firebase/database/getDocument";

export default function PagesEditor(props) {
  const [pageContent, setPageContent] = useState(null);

  const fetchPageContent = async () => {
    const result = await getDocument("pages", props.id);
    setPageContent(result);
  };

  useEffect(() => {
    fetchPageContent();
  }, [props.id]);

  return (
    <div className="pages">
      {pageContent?.content?.pages?.map((page, index) => (
        <div className="page" key={index}>
          <p>{page}</p>
          <button className="btn btn-danger">Delete</button>
        </div>
      ))}
    </div>
  );
}
