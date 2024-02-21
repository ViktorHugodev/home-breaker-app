'use client'

import { Dropdown, Navbar } from 'flowbite-react'
import { usePathname, useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface WalletProps {
  id: string
}
;[]

export function DefaultNavbar() {
  const pathname = usePathname()
  const params = useParams()
  const [walletData, setWalletData] = useState<WalletProps[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/wallets')
        if (response.ok) {
          const data = await response.json()
          setWalletData(data)
        } else {
          console.error('Erro ao buscar dados da API')
        }
      } catch (error) {
        console.error('Erro na requisição à API:', error)
      }
    }
    fetchData()
  }, [])
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href='#'>
        <Image
          className='mr-3 h-6 sm:h-9'
          alt='Full Cycle Invest'
          src='/logo.png'
          width={37}
          height={40}
        />
        <span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>
          FullCycle Invest
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link
          active={pathname === `/${params.wallet_id}`}
          as={Link}
          href={`/${params.wallet_id}`}
        >
          Home
        </Navbar.Link>
        <Navbar.Link href={`/${params.wallet_id}/home-broker`}>Ativos</Navbar.Link>
      </Navbar.Collapse>
      <Dropdown
        label={params.wallet_id ? params.wallet_id : 'Escolha sua carteira'}
        dismissOnClick={false}
      >
        {walletData.map(wallet => {
          return (
            <Dropdown.Item key={wallet.id}>
              <Link href={`/${wallet.id}`}>{wallet.id}</Link>
            </Dropdown.Item>
          )
        })}
      </Dropdown>
    </Navbar>
  )
}
