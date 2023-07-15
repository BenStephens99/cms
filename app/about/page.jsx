import './about.scss'

import TextPlugin from "../components/editable/plugins/TextPlugin/TextPlugin"
import ImagePlugin from '../components/editable/plugins/ImagePlugin/ImagePlugin'

export default async function About() {
    return (

        <div className='about-page'>
            <div className='about-text'>
                <h3>About</h3>
                <TextPlugin id='about-text' />
            </div>

            <div className='about-image'>
                <ImagePlugin id='about-image' />
            </div>
        </div>


    )
}