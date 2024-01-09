#!/usr/bin/python3

from flask import Flask, jsonify, request
import os

app = Flask(__name__)

@app.route('/', methods = ['GET', 'POST'])
def hello():
    username = "unknown"
    password = ""
    if request.method == 'POST':
      content = request.json
      username = content['username']
      password = content['password']

    data = {
        "message": f"Hello {username}, this is a Flask app without OpenTelemetry tracing!",
        "status": "success"
    }

    # HTTP response with a 200 OK status code and JSON data
    return jsonify(data), 200



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=6061, threaded=True)

