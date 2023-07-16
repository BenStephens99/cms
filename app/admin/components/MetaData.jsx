import getDocument from "@/app/api/firebase/database/getDocument"
import setData from "@/app/api/firebase/database/setData";

export default async function MetaData() {

    const meta = await getDocument('siteConfig', 'metadata');

    const save = async (updatedMeta) => {
        await setData('siteConfig', 'metadata', updatedMeta);
    }

    return (
        <div className="card admin-card">
            <div className="card-header">
                <h5>Metadata</h5>
            </div>
            <div className="card-body" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <MetaDataEditor title={meta?.title} description={meta?.description} save={save} />
            </div>
        </div>
    )
}

import { toast } from 'react-hot-toast';
import { useEffect, useState } from "react";

function MetaDataEditor(props) {
    'use client'

    const [title, setTitle] = useState(props.title);
    const [description, setDescription] = useState(props.description);

    const [buttonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        if ((title !== props.title) || (description !== props.description)) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [title, description])

    const save = ({title, description}) => {
        props.save({ title, description });
        setButtonDisabled(true);
        toast.success('Saved');
    }

    return (
        <>
            <div className="input-group">
                <span className="input-group-text">Title</span>
                <input className="form-control" type="text" defaultValue={title} onChange={(e) => setTitle(e.target.value)}></input>
            </div>
            <div className="input-group">
                <span className="input-group-text">Description</span>
                <textarea
                    className="form-control"
                    aria-label="With textarea"
                    type="text"
                    defaultValue={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ minHeight: "100px", width: "250px", resize: "none" }}
                />
            </div>
            <button
                style={{marginLeft: "auto"}}
                className="btn btn-primary"
                disabled={buttonDisabled}
                onClick={() => save({ title, description })}>
                Save
            </button>
        </>
    )

}