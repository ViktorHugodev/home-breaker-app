'use client'

import { Asset } from '@/models'
import { Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell } from 'flowbite-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

async function getAllAssets() {
  const response = await fetch(`http://localhost:3000/assets`)
  if (!response.ok) {
    throw new Error('Falha ao buscar os assets')
  }
  return response.json()
}
export function AssetStore() {
  console.log('OIII')
  const [assets, setAssets] = useState<Asset[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getAllAssets()
      .then(data => {
        setAssets(data)
        setLoading(false)
      })
      .catch(error => {
        setError(error.message)
        setLoading(false)
      })
  }, [])
  console.log('assets', assets)
  if (loading) return <p>Carregando...</p>
  if (error) return <p>Erro: {error}</p>

  return (
    <Table>
      <TableHead>
        <TableHeadCell>Nome</TableHeadCell>
        <TableHeadCell>Preço R$</TableHeadCell>

        <TableHeadCell>
          <span className='sr-only'>Comprar/Vender</span>
        </TableHeadCell>
      </TableHead>
      <TableBody className='divide-y'>
        {assets.map((asset, key) => (
          <TableRow className='border-gray-700 bg-gray-800' key={key}>
            <TableCell className='whitespace-nowrap font-medium text-white'>
              {asset.id} ({asset.symbol})
            </TableCell>
            <TableCell>{asset.price}</TableCell>

            <TableCell>
              <Link className='font-medium hover:underline text-cyan-500' href={`#`}>
                Comprar/Vender
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
