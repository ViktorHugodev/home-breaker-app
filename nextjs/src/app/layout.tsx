import { DefaultNavbar } from './components/NavBar'
import './globals.css'

export const metadata = {
  title: 'Home Broker Investments',
  description: 'Home Broker Investments',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className=''>
      <body className='bg-gray-900 h-screen flex flex-col dark'>
        <DefaultNavbar />
        {children}
      </body>
    </html>
  )
}
