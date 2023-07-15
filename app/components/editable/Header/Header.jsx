import LinkPlugin from '../plugins/LinkPlugin/LinkPlugin'
import './header.scss'
import Link from "next/link"
import MenuDropdown from './MenuDropdown'
import getAllDocumentNames from '@/app/api/firebase/database/getAllDocumentNames'

export default async function Header() {

  const galleries = await getAllDocumentNames('gallery')


  return (
    <header>
      <div className="content">
        <h2 className="title"><LinkPlugin id="header-text" /></h2>
        <nav>
          <ul>
            <MenuDropdown galleries={galleries}/>
            <li><Link href={'/about'}>About</Link></li>
            <li>Contact</li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

