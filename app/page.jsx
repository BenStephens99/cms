import TextPlugin from '@/components/editable/plugins/TextPlugin/TextPlugin'
import ImagePlugin from '@/components/editable/plugins/ImagePlugin/ImagePlugin'
import styles from './home.scss'
import ImageGalleryPlugin from '@/components/editable/plugins/ImageGalleryPlugin/ImageGalleryPlugin'

export default function Home() {

  return (
    <main className={styles.main}>


      <TextPlugin id="HVzkT1vCnHWAlpG1cmKO" />

      <ImageGalleryPlugin id="gallery" />

    </main>
  )
}
