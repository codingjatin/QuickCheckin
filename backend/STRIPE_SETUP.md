# Stripe Configuration for QuickCheck

## Environment Variables

Add these to your `.env` file:

```bash
# Stripe API Keys (get from Stripe Dashboard)
STRIPE_SECRET_KEY=sk_test_...    # Development
# STRIPE_SECRET_KEY=sk_live_...  # Production

STRIPE_PUBLISHABLE_KEY=pk_test_...    # For frontend
# STRIPE_PUBLISHABLE_KEY=pk_live_...  # Production

# Stripe Price IDs (create products in Stripe Dashboard first)
STRIPE_PRICE_US_SMALL=price_xxxxxxxxxxxxxxx  # $299/month USD
STRIPE_PRICE_US_LARGE=price_xxxxxxxxxxxxxxx  # $499/month USD
STRIPE_PRICE_CA_SMALL=price_xxxxxxxxxxxxxxx  # $299/month CAD
STRIPE_PRICE_CA_LARGE=price_xxxxxxxxxxxxxxx  # $499/month CAD

# Stripe Webhook Secret (for webhook signature verification)
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxx
```

## Setup Steps

### 1. Create Products in Stripe Dashboard

Go to Stripe Dashboard → Products → Create Product

**Product 1: QuickCheck Small (US)**
- Name: `QuickCheck Small (US)`
- Price: `$299.00 USD` per month
- Recurring billing: Monthly
- Copy the Price ID (starts with `price_`) → Use for `STRIPE_PRICE_US_SMALL`

**Product 2: QuickCheck Large (US)**
- Name: `QuickCheck Large (US)`
- Price: `$499.00 USD` per month
- Recurring billing: Monthly
- Copy the Price ID → Use for `STRIPE_PRICE_US_LARGE`

**Product 3: QuickCheck Small (Canada)**
- Name: `QuickCheck Small (Canada)`
- Price: `$299.00 CAD` per month
- Recurring billing: Monthly
- Copy the Price ID → Use for `STRIPE_PRICE_CA_SMALL`

**Product 4: QuickCheck Large (Canada)**
- Name: `QuickCheck Large (Canada)`
- Price: `$499.00 CAD` per month
- Recurring billing: Monthly
- Copy the Price ID → Use for `STRIPE_PRICE_CA_LARGE`

### 2. Get API Keys

Go to Stripe Dashboard → Developers → API Keys

- Copy **Publishable key** → Use for frontend
- Copy **Secret key** → Use for backend `.env`

### 3. Set Up Webhook

Go to Stripe Dashboard → Developers → Webhooks → Add endpoint

- **Endpoint URL:** `https://backend.quickcheckin.ca/api/webhooks/stripe`
- **Events to listen to:**
  - `customer.subscription.created`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
  - `customer.subscription.trial_will_end`
  - `invoice.payment_succeeded`
  - `invoice.payment_failed`
  - `charge.refunded`

- Copy the **Signing secret** → Use for `STRIPE_WEBHOOK_SECRET`

## Testing

### Test Card Numbers (Stripe Test Mode)

- **Success:** `4242 4242 4242 4242`
- **Decline:** `4000 0000 0000 0002`
- **Insufficient Funds:** `4000 0000 0000 9995`

Use any:
- Future expiry date (e.g., 12/25)
- Any 3-digit CVC
- Any ZIP code

### Test Subscriptions

1. Use test API keys (`sk_test_...` and `pk_test_...`)
2. Create a signup with test card
3. Verify trial starts correctly
4. Check Stripe Dashboard → Customers
5. Verify subscription shows 30-day trial

## Migration Notes

Before launching signup feature:

1. Run `node scripts/migrate-legacy-restaurants.js`
2. This sets existing restaurants to `legacy-free` plan
3. They will not be charged (no Stripe subscription)
4. Verify in database: `subscriptionPlan: 'legacy-free'`
5. Super Admin can review/update country and state data
