import '../admin.scss'

import getDocument from '@/app/api/firebase/database/getDocument'
import setData from '@/app/api/firebase/database/setData'
import { toast } from 'react-hot-toast';

const siteConfig = {
    'metadata': {
        title: 'Photography',
        description: 'A collection of my photography work',
    },
}

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

    let toUpdate = 0

    let pluginsToInitialise = []
    let configsToInitialise = []

    for (const plugin in basePlugins) {
        const res = await getDocument('editableSections', plugin)
        if (!res) {
            pluginsToInitialise.push(plugin)
        }
    }
    for (const config in siteConfig) {
        const res = await getDocument('siteConfig', config)

        if (!res) {
            configsToInitialise.push(config)
        }
    }

    toUpdate = pluginsToInitialise.length + configsToInitialise.length

    const initialisePlugins = async () => {
        pluginsToInitialise.forEach(async (plugin) => {
            await setData('editableSections', plugin, basePlugins[plugin])
        })
        configsToInitialise.forEach(async (config) => {
            await setData('siteConfig', config, siteConfig[config])
        })
        
        await fetch("/api/revalidate")
    }

    let content

    if (toUpdate > 0) {
        content =
            <>
                <div className="alert alert-danger" role="alert">
                    <p className="card-text">{`There are ${toUpdate} plugins missing.`}</p>
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
        props.initialisePlugins().then(() => {  
            router.refresh()
            toast.success('Site updated')
        })
    }

    return (
        <button className='btn btn-primary' onClick={initialisePlugins}>Initialise Plugins</button>
    )
}