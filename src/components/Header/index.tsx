import Image from 'next/image'

import logo from '../../../public/images/images-removebg-preview.png'
import { ActiveLink } from '../ActiveLink'
import styles from './styles.module.scss'

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <ActiveLink href="/" activeClassName={styles.active}>
          <span>
            <Image src={logo} alt="Sujeito Programador Logo" height={80} />
          </span>
        </ActiveLink>

        <nav>
          <ActiveLink href="/" activeClassName={styles.active}>
            <span>Home</span>
          </ActiveLink>

          <ActiveLink href="/posts" activeClassName={styles.active}>
            <span>Conteúdos</span>
          </ActiveLink>

          <ActiveLink href="/sobre" activeClassName={styles.active}>
            <span>Quem somos?</span>
          </ActiveLink>
        </nav>
      </div>
    </header>
  )
}
