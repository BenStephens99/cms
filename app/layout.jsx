import { AuthContextProvider } from './components/context/AuthContext'
import './globals.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import TopBar from './components/admin/TopBar'
import { EditModeProvider } from './components/context/EditContext'
import Header from './components/editable/Header/Header'
import getDocument from './api/firebase/database/getDocument'
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata() {
  const meta = await getDocument('siteConfig', 'metadata');
  return { 
    title: meta?.title ? meta.title : "Website Title",
    description: meta?.description ? meta.description : "A collection of my work",
  };
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true} >
        <AuthContextProvider>
          <EditModeProvider>
            <Toaster toastOptions={{
              style: {
                fontSize: '1rem',
              },
            }} />
            <TopBar />
            <Header />
            <main>
              {children}
            </main>
          </EditModeProvider >
        </AuthContextProvider>
        <Analytics />
      </body>
    </html>
  )
}
