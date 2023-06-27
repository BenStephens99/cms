'use client'

import './pagesEditor.scss'
import { useEffect, useState } from "react";
import getAllDocumentNames from "@/api/firebase/database/getAllDocumentNames";
import deleteDocument from '@/api/firebase/database/deleteDocument';
import setData from '@/api/firebase/database/setData';

export default function PagesEditor(props) {
  const [pages, setPages] = useState([]);

  const [pageName, setPageName] = useState('');

  const fetchPageContent = async () => {
    const result = await getAllDocumentNames(props.id);
    setPages(result);
  };

  useEffect(() => {
    fetchPageContent();
  }, [props.id]);

  const deletePage = async (id, page) => {
    await deleteDocument(id, page);
    fetchPageContent();
  }

  const addPage = async () => {
    let type = '';
    let content = {};
    switch (props.id) {
      case 'gallery':
        type = 'gallery-plugin';
        content = {
          images: {
            col1: [],
            col2: [],
            col3: [],
          }
        }
        break;
      default:
        type = 'unknown'
        break;
    }
    let newDoc = {
      type: type,
      content: content
    }
    const slug = pageName.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-');

    const result = await setData(props.id, slug, newDoc)
    setPageName('');
    fetchPageContent();
  }


  const setSelected = (url) => {
    if (url === props.selectedUrl) {
      props.setSelectedUrl('');
    } else {
      props.setSelectedUrl(url);
    }
  }

  return (
    <>
     <div className='add-new-page'>
        <input type="text" className="form-control" placeholder="Page name" value={pageName}
          onChange={(e) => setPageName(e.target.value)} />
        <button className="btn btn-primary" onClick={addPage}>Add new page</button>
      </div>
      <div className="pages-editor">
        {pages?.map((page, index) => (
          <div className={`page ${props.selectedUrl === props.id + '/' + page ? 'selected' : ''}`} key={index} onClick={() => setSelected(props.id + '/' + page)}>
            <span>{`${props.id}/${page}`}</span>
            <button className="btn btn-danger" onClick={() => deletePage(props.id, page)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}
