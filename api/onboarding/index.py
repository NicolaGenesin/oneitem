from flask import Flask, request
import os
import stripe

stripe.api_key = os.environ.get('STRIPE_SK')
app = Flask(__name__)

@app.route('/<path:path>', methods=["POST"])
def main(path):
    account_id= request.json.get('stripeAccountId')
    page_url = request.json.get('pageUrl')
    store_name = request.json.get('storeName')

    if account_id:
        account = stripe.Account.retrieve(account_id)
    else:
        account = stripe.Account.create(
            type='standard',
            business_profile={
                'url': page_url,
            },
            settings={
                'payments': {
                    'statement_descriptor': store_name,
                }
            }
        )

    account_link = stripe.AccountLink.create(
        account=account.id,
        refresh_url='https://ezyou.shop/home',
        return_url='https://ezyou.shop/home',
        type='account_onboarding',
    )

    return {
        'url': account_link.url,
        'stripeAccountId': account.id
    }
