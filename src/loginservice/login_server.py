#!/usr/bin/python3

from flask import Flask, jsonify, request
import os
import time
import random

app = Flask(__name__)

@app.route('/', methods = ['GET', 'POST'])
def hello():
    username = "unknown"
    password = ""
    if request.method == 'POST':
        content = request.json
        username = content['username']
        password = content['password']

        if "a" in password or "1" in password:
            sleep = random.randint(5, 10)
            time.sleep(sleep)
            data = {
                "message": "slow",
                "status": "success"
            }
        else:
            sleep = random.uniform(0, 1)
            time.sleep(sleep)
            data = {
                "message": "fast",
                "status": "success"
            }
    else:
        data = {
            "message": "why get?",
            "status": "fail"
        }

    # HTTP response with a 200 OK status code and JSON data
    return jsonify(data), 200



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=6061, threaded=True)

