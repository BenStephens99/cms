import LinkPlugin from '../plugins/LinkPlugin/LinkPlugin'
import './header.scss'
import Link from "next/link"

export default function Header() {
  return (
    <header>
      <div className="content">
        <h2 className="title"><LinkPlugin id="header-text" /></h2>
        <nav>
          <ul>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </nav>
      </div>
    </header>
  )
}