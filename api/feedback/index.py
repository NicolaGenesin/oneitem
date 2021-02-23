import os
from flask import Flask, request
from slack import WebClient
from slack.errors import SlackApiError

app = Flask(__name__)
token = 'xoxb-1776031658134-1807708411744-wbRpIOhhOvJqqkxXikRm8VvU'

@app.route('/<path:path>', methods=["POST"])
def main(path):
    email = request.json.get('email')
    message = request.json.get('message')
    text = 'Email: {}\n\nMessage: {}'.format(email, message)

    client = WebClient(token=token)

    try:
        client.chat_postMessage(
            channel='#feedback',
            text=text)
    except:
        pass

    return {}
