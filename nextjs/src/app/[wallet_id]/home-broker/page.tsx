import { AssetStore } from '../../components/AllAssets'

export default async function AssetsStore() {
  return (
    <main className='container mx-auto px-1'>
      <article className='format format-invert my-4'>
        <h1>Assets disponíveis</h1>
      </article>
      <AssetStore />
    </main>
  )
}
