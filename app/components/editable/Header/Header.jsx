import LinkPlugin from '../plugins/LinkPlugin/LinkPlugin'
import './header.scss'
import Link from "next/link"
import MenuDropdown from './MenuDropdown'
import getAllDocumentNames from '@/app/api/firebase/database/getAllDocumentNames'
import SocialLinksPlugin from '../plugins/SocialLinks/SocialLinksPlugin'
import MobileMenu from './MobileMenu'

export default async function Header() {

  const galleries = await getAllDocumentNames('gallery')

  const nav =
    <nav>
      <ul>
        <MenuDropdown galleries={galleries} />
        <li><Link href={'/about'}>About</Link></li>
        <li><Link href={'/contact'}>Contact</Link></li>
        <li><SocialLinksPlugin id="header-social-links" /></li>
      </ul>
    </nav>


  return (
    <header>
      <div className="content">
        <h2 className="title"><LinkPlugin id="header-text" /></h2>
        {nav}
        <MobileMenu nav={nav} />
      </div>
    </header>
  )
}

