import TextPlugin from '@/components/editable/plugins/TextPlugin/TextPlugin'
import ImagePlugin from '@/components/editable/plugins/ImagePlugin/ImagePlugin'
import styles from './home.scss'
import ImageGalleryPlugin from '@/components/editable/plugins/ImageGalleryPlugin/ImageGalleryPlugin'

export default function Home() {

  return (
    <main className={styles.main}>
      <TextPlugin id="u9yUP0pX7TYyjJFUYoyR" />

      <ImageGalleryPlugin id="gallery"/>

    </main>
  )
}
