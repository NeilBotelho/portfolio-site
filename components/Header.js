import Link from 'next/link'
// import styles from './Header.module.css'

export default function Header() {
  return (
    <>
      <header className="header">
        <nav className="nav">
              <Link href="/">
                <a>Projects</a>
              </Link>
              <Link href="/about">
                <a>About</a>
              </Link>
        </nav>
    
      </header>
    </>
  )
}
