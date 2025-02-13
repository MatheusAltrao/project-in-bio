'use client'

import { loadStripe, Stripe } from '@stripe/stripe-js'
import { useEffect, useState } from 'react'

export default function useStripe() {
  const [stripe, setStripe] = useState<Stripe | null>(null)

  useEffect(() => {
    async function loadStripeAsync() {
      const stripeInstance = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string,
      )

      setStripe(stripeInstance)
    }

    loadStripeAsync()
  }, [])

  async function createStripeCheckout({
    metadata,
    isSubscription,
  }: {
    metadata: Record<string, any>
    isSubscription: boolean
  }) {
    try {
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        body: JSON.stringify({ metadata, isSubscription }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      await stripe?.redirectToCheckout({
        sessionId: data.sessionId,
      })
    } catch (error) {
      console.error(error)
      return false
    }
  }

  async function handleCreateStripePortal() {
    try {
      const response = await fetch('/api/stripe/create-portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      window.location.href = data.url
    } catch (error) {
      console.error(error)
    }
  }

  return {
    createStripeCheckout,
    handleCreateStripePortal,
  }
}
