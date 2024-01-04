import { WalletAsset } from '@/models'

interface MyWallet {
  wallet_id: string
}

async function getWalletAssets(wallet_id: string): Promise<WalletAsset[]> {
  const response = await fetch(`http://localhost:8000/wallets/${wallet_id}/assets`)
  return response.json()
}

export default async function MyWallet({ wallet_id }: MyWallet) {
  const walletAssets = await getWalletAssets(wallet_id)
  return (
    <ul>
      {walletAssets.map(walletAsset => (
        <li key={walletAsset.id}>
          {walletAsset.Asset.id} - {walletAsset.shares} - R$ {walletAsset.Asset.price}
        </li>
      ))}
    </ul>
  )
}
