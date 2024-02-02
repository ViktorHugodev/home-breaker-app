import { NextRequest, NextResponse } from 'next/server'

interface RequestParams {
  params: {
    wallet_id: string
  }
}

export async function GET(request: NextRequest, { params }: RequestParams) {
  const response = await fetch(`http://localhost:3000/wallets/${params.wallet_id}/assets`, {
    next: {
      // revalidate: isHomeBrokerClosed() ? 60 * 60 : 10,
      revalidate: 1,
    },
  })
  return NextResponse.json(await response.json())
}
