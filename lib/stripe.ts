import Stripe from "stripe";

export const stripe = new Stripe(
  process.env.NEXT_PRIVATE_STRIPE_SECURITY_KEY!,
  {
    typescript: true,
  }
);