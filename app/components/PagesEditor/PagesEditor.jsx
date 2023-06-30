'use client'

import './pagesEditor.scss'
import { useEffect, useState } from "react";
import getAllDocumentNames from '@/app/api/firebase/database/getAllDocumentNames';
import deleteDocument from '@/app/api/firebase/database/deleteDocument';
import setData from '@/app/api/firebase/database/setData';
import { PlusLg } from 'react-bootstrap-icons';
import { toast } from 'react-hot-toast';
import { CaretRightFill } from 'react-bootstrap-icons';
import getDocument from '@/app/api/firebase/database/getDocument';

export default function PagesEditor(props) {
  const [pages, setPages] = useState([]);

  const [pageName, setPageName] = useState('');

  const [showPageEditor, setShowPageEditor] = useState(false);

  const togglePageEditor = () => {
    setShowPageEditor(!showPageEditor);
  }

  const fetchPageContent = async () => {
    const result = await getAllDocumentNames(props.id);
    setPages(result);
  };

  useEffect(() => {
    fetchPageContent();
  }, [props.id]);

  const deletePage = async (id, page) => {
    const confirmed = confirm(`Are you sure you want to delete ${page}?`);

    if (confirmed) {

      switch (id) {

        case 'gallery':
          const gallery = await getDocument(id, page);
          const images = gallery.content.images;

          for (const key in images) {
            for (const image of images[key]) {
              deleteDocument('editableSections', image);
            }
          }
          break;

        default:
          console.log("Unknown page type")
          break;
      }

      await deleteDocument(id, page);
      fetchPageContent();
    }
  }

  const addPage = async () => {
    if (pageName === '') {
      toast.error('Page name cannot be empty');
      return;
    }

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
      <div className='page-editor-header' onClick={togglePageEditor}>
        <span className={`dropdown-icon ${showPageEditor ? 'open' : 'closed'}`}><CaretRightFill /></span>
        <span className='title'>{`${props.id} pages editor`} </span>
        <span></span>
      </div>

      <div className={`pages-editor ${showPageEditor ? 'show' : 'hide'}`}>
        {pages?.map((page, index) => (
          <div className={`page ${props.selectedUrl === props.id + '/' + page ? 'selected' : ''} form-control`} key={index} onClick={() => setSelected(props.id + '/' + page)}>
            <span>{`${props.id}/${page}`}</span>
            <button className="btn btn-danger" onClick={() => deletePage(props.id, page)}>Delete</button>
          </div>
        ))}
        <div className='add-new-page form-control'>
          <input type="text" placeholder={`New ${props.id}`} value={pageName}
            onChange={(e) => setPageName(e.target.value)} />
          <button className="btn btn-primary" onClick={addPage}><PlusLg height={"1.5em"} width={'1.5em'} /></button>
        </div>
      </div>
    </>
  );
}
