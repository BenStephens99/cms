import { AuthContextProvider } from '../components/context/AuthContext'
import './globals.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import TopBar from '../components/admin/TopBar'
import { EditModeProvider } from '@/components/context/EditContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <EditModeProvider>
            <Toaster toastOptions={{
              style: {
                fontSize: '1.4rem',
              },
            }} />
            <TopBar />
            {children}
            </EditModeProvider >
        </AuthContextProvider>
      </body>
    </html>
  )
}
