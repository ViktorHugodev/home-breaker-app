import { MyOrders } from '@/app/components/MyOrders'
import { OrderForm } from '@/app/components/OrderForm'

interface HomeProps {
  params: {
    wallet_id: string
    asset_id: string
  }
}

export default async function HomeBrokerPage({ params }: HomeProps) {
  return (
    <div>
      <h2>Home Broker</h2>
      <div className='flex '>
        <div className='flex flex-col'>
          <OrderForm asset_id={params.asset_id} wallet_id={params.wallet_id} />
          <div>
            <MyOrders wallet_id={params.wallet_id} />
          </div>
        </div>
      </div>
    </div>
  )
}
