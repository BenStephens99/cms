import TextPlugin from '@/components/editable/plugins/TextPlugin/TextPlugin'
import ImagePlugin from '@/components/editable/plugins/ImagePlugin/ImagePlugin'
import styles from './home.scss'

export default function Home() {

  return (
    <main className={styles.main}>
      <TextPlugin id="u9yUP0pX7TYyjJFUYoyR" />

      <div className='imagesContainer'>
        <ImagePlugin id="rzMd9LJQ0Ng2Z0Fk8Rko" />
      </div>

    </main>
  )
}
