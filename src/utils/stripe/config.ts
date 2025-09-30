import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_LIVE ?? process.env.STRIPE_SECRET_KEY ?? '', {
  // https://github.com/stripe/stripe-node#configuration
  // https://stripe.com/docs/api/versioning
  // @ts-expect-error 3 characters or longer
  apiVersion: null,
  // Register this as an official Stripe plugin.
  // https://stripe.com/docs/building-plugins#setappinfo
  appInfo: {
    name: 'Dunamis',
    url: 'https://github.com/001elijah/nextjs-boilerplate',
    version: '0.0.0'
  }
})
