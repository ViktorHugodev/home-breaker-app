import { WalletAsset } from '@/models'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from './flowbite-components'
import Link from 'next/link'

interface MyWallet {
  wallet_id: string
}

async function getWalletAssets(wallet_id: string): Promise<WalletAsset[]> {
  const response = await fetch(`http://localhost:8000/wallets/${wallet_id}/assets`, {
    next: {
      // revalidate: isHomeBrokerClosed() ? 60 * 60 : 10,
      revalidate: 1,
    },
  })
  return response.json()
}

export async function MyWallet({ wallet_id }: MyWallet) {
  const walletAssets = await getWalletAssets(wallet_id)
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
