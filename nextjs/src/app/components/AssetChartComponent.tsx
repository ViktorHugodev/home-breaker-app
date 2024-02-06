'use client'

import { fetcher } from '@/utils'
import { ChartComponent } from './CharComponent'
import useSWR from 'swr'

interface AssetChartProps {
  asset_id: string
}
export const AssetChartComponent = ({ asset_id }: AssetChartProps) => {
  const { data: asset, mutate } = useSWR(`http://localhost:3000/assets/${asset_id}`, fetcher, {
    fallbackData: { id: asset_id, price: 0 },
  })
  return <ChartComponent header={`${asset_id} - R$ ${asset?.price}`} />
}
