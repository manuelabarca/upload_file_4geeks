"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from werkzeug.utils import secure_filename
import base64

api = Blueprint('api', __name__)
UPLOAD_FOLDER= 'uploads/'


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200


@api.route('/upload/profile/', methods=['POST'])
def fileUpload():
    target = os.path.join(UPLOAD_FOLDER)
    if not os.path.isdir(target):
        os.mkdir(target)
    file = request.files['File']
    ##imagen com otexto
    imageString = base64.b64encode(file.read())
    imageString = imageString.decode('ascii')

    print(imageString)

    result = {
        "image": imageString
    }

    return jsonify(result)
