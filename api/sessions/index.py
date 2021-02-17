from flask import Flask, request, jsonify
import stripe

# TODO Set your secret key. Remember to switch to your live secret key in production!
# See your keys here: https://dashboard.stripe.com/account/apikeys
stripe.api_key = 'sk_test_51IAtqhIS8juGZ20Vm2LRwyAklABPSu5miNHuGxGSil5siicDndllLAywuigaazTUpGeUxDMjcKvmrCgOuIgQ80GU00sBK7UpAk'
app = Flask(__name__)


@app.route('/<path:path>', methods=["POST"])
def create_checkout_session():
    body = request.json
    product = body.get('product')
    currency = 'eur'

    if product.get('currency') == '$':
        currency = 'usd'
    elif product.get('currency') == '£':
        currency = 'gbp'

    session = stripe.checkout.Session.create(
        billing_address_collection='auto',
        shipping_address_collection={
            # AC, AD, AE, AF, AG, AI, AL, AM, AO, AQ, AR, AT, AU, AW, AX, AZ, BA, BB, BD, BE,
            # BF, BG, BH, BI, BJ, BL, BM, BN, BO, BQ, BR, BS, BT, BV, BW, BY, BZ, CA, CD, CF,
            # CG, CH, CI, CK, CL, CM, CN, CO, CR, CV, CW, CY, CZ, DE, DJ, DK, DM, DO, DZ, EC,
            # EE, EG, EH, ER, ES, ET, FI, FJ, FK, FO, FR, GA, GB, GD, GE, GF, GG, GH, GI, GL,
            # GM, GN, GP, GQ, GR, GS, GT, GU, GW, GY, HK, HN, HR, HT, HU, ID, IE, IL, IM, IN,
            # IO, IQ, IS, IT, JE, JM, JO, JP, KE, KG, KH, KI, KM, KN, KR, KW, KY, KZ, LA, LB,
            # LC, LI, LK, LR, LS, LT, LU, LV, LY, MA, MC, MD, ME, MF, MG, MK, ML, MM, MN, MO,
            # MQ, MR, MS, MT, MU, MV, MW, MX, MY, MZ, NA, NC, NE, NG, NI, NL, NO, NP, NR, NU,
            # NZ, OM, PA, PE, PF, PG, PH, PK, PL, PM, PN, PR, PS, PT, PY, QA, RE, RO, RS, RU,
            # RW, SA, SB, SC, SE, SG, SH, SI, SJ, SK, SL, SM, SN, SO, SR, SS, ST, SV, SX, SZ,
            # TA, TC, TD, TF, TG, TH, TJ, TK, TL, TM, TN, TO, TR, TT, TV, TW, TZ, UA, UG, US,
            # UY, UZ, VA, VC, VE, VG, VN, VU, WF, WS, XK, YE, YT, ZA, ZM, ZW
            'allowed_countries': ['US', 'IT', 'GB'],
        },
        payment_method_types=['card'],
        line_items=[{
            'price_data': {
                'currency': currency,
                'product_data': {
                    'name': product.get('name'),
                },
                'unit_amount': int(float(product.get('price')) * 100),
            },
            'quantity': 1,
        }],
        mode='payment',
        success_url='https://ezyou.shop{}/success'.format(body.get('pagePath')),
        cancel_url='https://ezyou.shop{}/issue'.format(body.get('pagePath')),
        stripe_account=body.get('stripeAccountId')
    )

    return jsonify(id=session.id)
