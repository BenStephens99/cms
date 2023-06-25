import TextPlugin from "../plugins/TextPlugin/TextPlugin"
import './header.scss'
import Link from "next/link"

export default function Header() {
  return (
    <header>
      <div className="content">
        <h2 className="title"><Link href={'/'}><TextPlugin id="header-text" /></Link></h2>
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