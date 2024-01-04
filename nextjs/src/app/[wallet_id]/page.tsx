interface HomeProps {
  params: {
    wallet_id: string
  }
}
export default function HomePage({ params }: HomeProps) {
  return (
    <div>
      <h1>Meus investimentos</h1>
      <h2>{params.wallet_id}</h2>
    </div>
  )
}
