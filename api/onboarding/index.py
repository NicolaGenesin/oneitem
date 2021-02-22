from flask import Flask, request
import os
import stripe

stripe.api_key = os.environ.get('STRIPE_SK')
app = Flask(__name__)

@app.route('/<path:path>', methods=["POST"])
def main(path):
    accountId = request.json.get('stripeAccountId')

    if accountId:
        account = stripe.Account.retrieve(accountId)
    else:
        account = stripe.Account.create(
            type='standard',
        )

    account_link = stripe.AccountLink.create(
        account=account.id,
        refresh_url='http://ezyou.shop/home',
        return_url='http://ezyou.shop/home',
        type='account_onboarding',
    )

    return {
        'url': account_link.url,
        'stripeAccountId': account.id
    }
