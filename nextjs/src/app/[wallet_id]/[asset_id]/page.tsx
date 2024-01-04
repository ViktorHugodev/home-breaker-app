import MyWallet from '@/app/components/MyWallet'

interface HomeProps {
  params: {
    wallet_id: string
  }
}

export default async function HomeBrokerPage({ params }: HomeProps) {
  return (
    <div>
      <h2>Meus investimentos</h2>
      <MyWallet wallet_id={params.wallet_id} />
    </div>
  )
}
