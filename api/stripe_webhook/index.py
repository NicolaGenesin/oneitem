import os
import stripe
import codecs
from flask import Flask, request
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

stripe.api_key = os.environ.get('STRIPE_SK')
app = Flask(__name__)

# Example: https://github.com/sendgrid/sendgrid-python/blob/4606b8557eb30e5972dfcf1b2e00498c75179ae5/use_cases/transactional_templates.md
SENDGRID_API_KEY='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'
EN_TEMPLATE_ID='d-ca868ee684624acb90998258606e80a3'

def send_email(recipient, template_id, dynamic_template_data):
    message = Mail(
        from_email='hi@ezyou.shop',
        to_emails=['hi@ezyou.shop', recipient], # todo remove myself from here 
        )
    message.dynamic_template_data = dynamic_template_data
    message.template_id = template_id
    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        sg.send(message)
        return {'result': 'sent'}
    except Exception as e:
        print(e)
        return {'result': 'error'}

@app.route('/<path:path>', methods=["POST"])
def main(path):
    print('[HIT] Stripe Webhook')

    body = request.json
    event_type = body.get('type')

    if event_type == 'checkout.session.completed':
        connected_account = stripe.Account.retrieve(body.get('account'))
        # Account.retrieve sample response
        # {
        #     "business_profile": {
        #         "mcc": "5734",
        #         "name": "Ciccio",
        #         "support_address": null,
        #         "support_email": null,
        #         "support_phone": "+3903516789722",
        #         "support_url": null,
        #         "url": "https://ezyou.shop/nicola-lab"
        #     },
        #     "charges_enabled": true,
        #     "country": "IT",
        #     "default_currency": "eur",
        #     "details_submitted": true,
        #     "email": "fw8vlpfwkqkxfw8vlpfwkqkx@gmoul.com",
        #     "id": "acct_1IP2zUAKBH47TYQX",
        #     "metadata": {},
        #     "object": "account",
        #     "payouts_enabled": false,
        #     "type": "standard"
        #     }

        connected_account_email = connected_account.get('email')
        # connected_account_name = connected_account.get('business_profile').get('name') this is null for Elena
        country = connected_account.get('country')
        template_id = EN_TEMPLATE_ID

        # This is the webhook event
        # {
        #     "id": "evt_1IP52TAKBH47TYQXp4kaLjfS",
        #     "object": "event",
        #     "account": "acct_1IP2zUAKBH47TYQX",
        #     "api_version": "2020-08-27",
        #     "created": 1614341001,
        #     "data": {
        #         "object": {
        #         "id": "cs_test_a14mmbHaak36I0diWajtAvnxKeklQ9WOf99iWoIpHd8l8IJm3iiiynmBZE",
        #         "object": "checkout.session",
        #         "allow_promotion_codes": null,
        #         "amount_subtotal": 100,
        #         "amount_total": 100,
        #         "billing_address_collection": "auto",
        #         "cancel_url": "https://ezyou.shop/test-account-stripe/product",
        #         "client_reference_id": null,
        #         "currency": "eur",
        #         "customer": "cus_J17GM6IdxB3Ock",
        #         "customer_details": {
        #             "email": "nicolo@gmail.com",
        #             "tax_exempt": "none",
        #             "tax_ids": [
        #             ]
        #         },
        #         "customer_email": "nicolo@gmail.com",
        #         "livemode": false,
        #         "locale": null,
        #         "metadata": {
        #         },
        #         "mode": "payment",
        #         "payment_intent": "pi_1IP520AKBH47TYQXtkFXvrKB",
        #         "payment_method_types": [
        #             "card"
        #         ],
        #         "payment_status": "paid",
        #         "setup_intent": null,
        #         "shipping": {
        #             "address": {
        #             "city": "Loreggia",
        #             "country": "IT",
        #             "line1": "Via Guizze Basse, 31",
        #             "line2": null,
        #             "postal_code": "35010",
        #             "state": "AT"
        #             },
        #             "name": "Nicola Genesin"
        #         },
        #         "shipping_address_collection": {
        #             "allowed_countries": [
        #             "US",
        #             "IT",
        #             "GB"
        #             ]
        #         },
        #         "submit_type": null,
        #         "subscription": null,
        #         "success_url": "https://ezyou.shop/test-account-stripe/product/success",
        #         "total_details": {
        #             "amount_discount": 0,
        #             "amount_tax": 0
        #         }
        #         }
        #     },
        #     "livemode": false,
        #     "pending_webhooks": 3,
        #     "request": {
        #         "id": null,
        #         "idempotency_key": null
        #     },
        #     "type": "checkout.session.completed"
        # }
        object_data = body.get('data').get('object')
        shipping = object_data.get('shipping')
        customer_details = object_data.get('customer_details')
        product_name = object_data.get('metadata').get('product_name')
        product_page_url = object_data.get('cancel_url')

        # todo this is a tmp very bad solution to inject all the text directly from here. ideally we'd use different templates 
        if country == 'IT':
            title = 'Hai ricevuto un nuovo ordine!'
            subtitle = 'Ciao! Un nuovo cliente ha appena comprato un tuo prodotto chiamato {} da questa pagina {}'.format(product_name, product_page_url)
            shippingTitle = 'Le informazioni di spedizione del tuo cliente'
            button = 'Controlla questo ordine sul pannello dei pagamenti'
        else:
            title = 'You\'ve received a New Order!'
            subtitle = 'Hi! A new customer just bought a product named {} from this page {}'.format(product_name, product_page_url)
            shippingTitle = 'Your Customer Shipping Information'
            button = 'Check this order in the Payments Dashboard'

        dynamic_template_data = {
            'connected_account_email': connected_account_email,
            # 'connected_account_name': connected_account_name,
            'product_name': product_name,
            'product_page_url': product_page_url,
            'dashboard_link': 'https://dashboard.stripe.com/payments/{}'.format(object_data.get('payment_intent')),
            'shipping_address_city': shipping.get('address').get('city'),
            'shipping_address_country': shipping.get('address').get('country'),
            'shipping_address_line1': shipping.get('address').get('line1'),
            'shipping_address_line2': shipping.get('address').get('line2'),
            'shipping_address_postal_code': shipping.get('address').get('postal_code'),
            'shipping_address_state': shipping.get('address').get('state'),
            'shipping_customer_name': shipping.get('name'),
            'shipping_customer_email': customer_details.get('email'),
            # once you're working with different templates, ypu can delete the attribs below
            'title': title,
            'subtitle': subtitle,
            'shippingTitle': shippingTitle,
            'button': button,
        }

        send_email(connected_account_email, template_id, dynamic_template_data)

    return {}
