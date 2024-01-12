import FlowbiteContext from './components/FlowbiteContext'
import { DefaultNavbar } from './components/NavBar'
import './globals.css'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className='dark'>
      <body className='bg-gray-900 h-screen flex flex-col dark'>
        <DefaultNavbar />
        {children}
      </body>
    </html>
  )
}
