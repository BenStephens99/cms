import '../admin.scss'

import getDocument from '@/app/api/firebase/database/getDocument'
import setData from '@/app/api/firebase/database/setData'
import { toast } from 'react-hot-toast';

const basePlugins = {
    'header-text': {
        type: 'link-plugin',
        content: {
            text: '',
            url: '/',
        }
    },
    'gallery-menu': {
        type: 'gallery-menu',
        content: {
            items: []
        }
    },
    'about-text': {
        type: 'text-plugin',
        content: {
            text: ''
        }
    },
    'about-image': {
        type: 'image-plugin',
        content: {
            url: '',
            alt: '',
        }
    },
    'header-social-links': {
        type: "social-links-plugin",
        content: {
        }
    },
}   

export default async function InitialiseSite() {
    let pluginsToInitialise = []

    const initialisePlugins = async () => {
        pluginsToInitialise.forEach(async (plugin) => {
            await setData('editableSections', plugin, basePlugins[plugin])
        })
    }

    for (const plugin in basePlugins) {
        const res = await getDocument('editableSections', plugin)
        if (!res) {
            pluginsToInitialise.push(plugin)
        }
    }

    let content

    if (pluginsToInitialise.length) {
        content =
            <>
                <div className="alert alert-danger" role="alert">
                    <p className="card-text">{`There are ${pluginsToInitialise.length} plugins missing.`}</p>
                </div>
                <p>Press the button below to update your site</p>
                <InitialisePlugins initialisePlugins={initialisePlugins} />
            </>
    } else {
        content =
            <div className="alert alert-success" role="alert">
                <p className="card-text">Your site is up to date</p>
            </div>
    }

    return (
        <div className="card admin-card">
            <div className="card-header">
                <h5>Initialise Site</h5>
            </div>
            <div className="card-body">
                {content}
            </div>
        </div>
    )
}

import { useRouter } from 'next/navigation'

function InitialisePlugins(props) {
    'use client'

    const router = useRouter()

    const initialisePlugins = () => {
        props.initialisePlugins()
        fetch("/api/revalidate")
        router.refresh()
        toast.success('Plugins Updated')
    }

    return (
        <button className='btn btn-primary' onClick={initialisePlugins}>Initialise Plugins</button>
    )
}