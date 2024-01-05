import { Order, WalletAsset } from '@/models'
import { isHomeBrokerClosed } from '@/utils'

interface MyOrders {
  wallet_id: string
}

async function getOrders(wallet_id: string): Promise<Order[]> {
  const response = await fetch(`http://localhost:8000/wallets/${wallet_id}/orders`, {
    next: {
      tags: [`orders-wallet-${wallet_id}`],
      // revalidate: isHomeBrokerClosed() ? 60 * 60 : 10,
      revalidate: 1,
    },
  })
  return response.json()
}

export async function MyOrders({ wallet_id }: MyOrders) {
  const orders = await getOrders(wallet_id)
  return (
    <ul>
      {orders.map(order => (
        <li key={order.id}>
          {order.Asset.id} - {order.shares} - R$ {order.price} - {order.status}
        </li>
      ))}
    </ul>
  )
}
