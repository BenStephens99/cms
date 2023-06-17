import styles from './home.scss'
import ContentMenu from '@/components/editable/plugins/ContentMenu'

export default function Home() {

  return (
    <main className={styles.main}>
      <ContentMenu />
    </main>
  )
}
