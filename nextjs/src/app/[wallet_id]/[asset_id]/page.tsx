import { MyOrders } from '@/app/components/MyOrders'
import { OrderForm } from '@/app/components/OrderForm'
import { TabsGroup, TabsItem } from '@/app/components/flowbite-components'

interface HomeProps {
  params: {
    wallet_id: string
    asset_id: string
  }
}

export default async function HomeBrokerPage({ params }: HomeProps) {
  return (
    <main className='flex flex-grow flex-col container mx-auto p-2'>
      <article className='format format-invert'>
        <h1>Home broker - {params.asset_id}</h1>
      </article>
      <div className='flex '>
        <div className='flex flex-col'>
          <TabsGroup aria-label='Default tabs' style='pills'>
            <TabsItem active title='Comprar'>
              <OrderForm wallet_id={params.wallet_id} asset_id={params.asset_id} type='BUY' />
            </TabsItem>
            <TabsItem title='Vender'>
              <OrderForm wallet_id={params.wallet_id} asset_id={params.asset_id} type='SELL' />
            </TabsItem>
          </TabsGroup>
          <div>
            <MyOrders wallet_id={params.wallet_id} />
          </div>
        </div>
      </div>
    </main>
  )
}
