import os
from flask import Flask, send_from_directory
from flask_cors import CORS

app = Flask("Product deal check")
CORS(app)

@app.route("/")
def getHomePage():
    return send_from_directory('html', "index.html")

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port, debug=False)
