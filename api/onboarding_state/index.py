from flask import Flask, request
import os
import stripe

stripe.api_key = os.environ.get('STRIPE_SK')
app = Flask(__name__)

@app.route('/<path:path>', methods=["POST"])
def main(path):
    accountId = request.json.get('stripeAccountId')

    try:
        account = stripe.Account.retrieve(accountId)

        if account:
            return {
                'detailsSubmitted': account.details_submitted,
                'chargesEnabled': account.charges_enabled,
            }
    except stripe.error.PermissionError:
        pass

    return {'status': 'error'}
