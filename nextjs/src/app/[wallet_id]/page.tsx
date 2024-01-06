import { MyWallet } from '../components/MyWallet'

interface HomeProps {
  params: {
    wallet_id: string
  }
}

export default async function HomePage({ params }: HomeProps) {
  return (
    <div>
      <article className='format format-invert my-6'>
        <h1>Meus investimentos</h1>
      </article>
      <MyWallet wallet_id={params.wallet_id} />
    </div>
  )
}
