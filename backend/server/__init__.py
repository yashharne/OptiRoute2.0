import os
from dotenv import load_dotenv
load_dotenv(dotenv_path=os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env.local'))

from flask import Flask, jsonify
from flask_cors import CORS 
import pandas as pd


app = Flask(__name__, instance_relative_config=True)
CORS(app, resources={r"*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

app.config.from_mapping(
    SECRET_KEY='dev',
)

from . import db
db.init_app(app)

from . import auth
app.register_blueprint(auth.bp, url_prefix='/auth')

from . import route
app.register_blueprint(route.bp)

@app.route("/")
def hello():
    return jsonify({"h":"hello world"})