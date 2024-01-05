import { revalidateTag } from 'next/cache'

async function initTransaction(formData: FormData) {
  'use server'
  const shares = formData.get('shares')
  const price = formData.get('price')
  const wallet_id = formData.get('wallet_id')
  const asset_id = formData.get('asset_id')
  const type = formData.get('type')
  console.log(shares, price, asset_id, type)
  const response = await fetch(`http://localhost:8000/wallets/${wallet_id}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      shares,
      price,
      asset_id,
      type,
      status: 'OPEN',
      Asset: { id: asset_id, symbol: 'PETR4', price: 30 },
    }),
  })
  console.log(response.status)
  revalidateTag(`orders-wallet-${wallet_id}`)
  return await response.json()
}
interface OrderFormProps {
  wallet_id: string
  asset_id: string
}

export function OrderForm({ wallet_id, asset_id }: OrderFormProps) {
  return (
    <div>
      <h2>OrderForm</h2>
      <form action={initTransaction} className='flex flex-col'>
        <input name='asset_id' type='hidden' defaultValue={asset_id} />
        <input name='wallet_id' type='hidden' defaultValue={wallet_id} />
        <input name='type' type='hidden' defaultValue={'BUY'} />
        <input
          name='shares'
          type='number'
          min={1}
          step={1}
          placeholder='quantidade'
          className='text-black'
        />
        <input
          name='price'
          type='number'
          min={1}
          step={0.1}
          placeholder='preço'
          className='text-black'
        />
        <button type='submit'>Comprar</button>
      </form>
    </div>
  )
}
