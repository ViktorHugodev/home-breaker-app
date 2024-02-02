'use client'

import { WalletAsset } from '@/models'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from './flowbite-components'
import { fetcher } from '@/utils'
import Link from 'next/link'
import useSWR from 'swr'
import useSWRSubscription, { SWRSubscriptionOptions } from 'swr/subscription'

interface MyWallet {
  wallet_id: string
}

// async function getWalletAssets(wallet_id: string): Promise<WalletAsset[]> {
//   const response = await fetch(`http://localhost:3000/wallets/${wallet_id}/assets`, {
//     next: {
//       // revalidate: isHomeBrokerClosed() ? 60 * 60 : 10,
//       revalidate: 1,
//     },
//   })
//   return response.json()
// }

export function MyWallet({ wallet_id }: MyWallet) {
  // const walletAssets = await getWalletAssets(wallet_id)
  const {
    data: walletAssets,
    error,
    mutate: mutateWalletAsset,
  } = useSWR<WalletAsset[]>(`http://localhost:3333/api/wallets/${wallet_id}/assets`, fetcher, {
    fallbackData: [],
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  const { data: walletAssetUpdated } = useSWRSubscription(
    `http://localhost:3333/api/wallets/${wallet_id}/events`,
    (path, { next }: SWRSubscriptionOptions) => {
      console.log(path, next)
      const eventSource = new EventSource(path)
      eventSource.addEventListener('wallet-asset-update', async event => {
        const walletAssetUpdated: WalletAsset = JSON.parse(event.data)
        // next(walletAssetUpdated)
        await mutateWalletAsset(prev => {
          const foundIndex = prev?.findIndex(
            walletAsset => walletAsset.asset_id === walletAssetUpdated.asset_id,
          )
          if (foundIndex !== -1) {
            prev![foundIndex!].shares = walletAssetUpdated.shares
          }
          return [...prev!]
        }, false)
        next(walletAssetUpdated)
      })
      eventSource.onmessage = event => {
        const walletAssetUpdated = JSON.parse(event.data)
        next(walletAssetUpdated)
      }
      return () => {
        eventSource.close()
      }
    },
  )
  return (
    <Table>
      <TableHead>
        <TableHeadCell>Nome</TableHeadCell>
        <TableHeadCell>Preço R$</TableHeadCell>
        <TableHeadCell>Quant.</TableHeadCell>
        <TableHeadCell>
          <span className='sr-only'>Comprar/Vender</span>
        </TableHeadCell>
      </TableHead>
      <TableBody className='divide-y'>
        {walletAssets!.map((walletAsset, key) => (
          <TableRow className='border-gray-700 bg-gray-800' key={key}>
            <TableCell className='whitespace-nowrap font-medium text-white'>
              {walletAsset.Asset.id} ({walletAsset.Asset.symbol})
            </TableCell>
            <TableCell>{walletAsset.Asset.price}</TableCell>
            <TableCell>{walletAsset.shares}</TableCell>
            <TableCell>
              <Link
                className='font-medium hover:underline text-cyan-500'
                href={`/${wallet_id}/${walletAsset.Asset.id}`}
              >
                Comprar/Vender
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
