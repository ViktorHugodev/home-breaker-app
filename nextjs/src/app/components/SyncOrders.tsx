'use client'

import { PropsWithChildren } from 'react'

export function SyncOrders(props: PropsWithChildren<{ wallet_id: string }>) {
  return <>{props.children}</>
}
