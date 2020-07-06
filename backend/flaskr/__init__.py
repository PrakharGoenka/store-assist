import os

from flask import Flask
from flask_mongoengine import *
# from models import User
from flask_mongoengine.wtf import *
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
import json
from flask import request

import requests

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config['MONGODB_SETTINGS'] = {
        'db': 'testcol',
        'host': 'mongodb+srv://dbuser:dbpass123@cluster0.qple4.gcp.mongodb.net/testdb?retryWrites=true&w=majority'
    }
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    db = MongoEngine(app)

    class Item(db.EmbeddedDocument):
        url = db.StringField(max_length=200, required = True)
        name = db.StringField(max_length=200, required = True)
        desc = db.StringField(max_length=500, required = False)

    class Section(db.Document):
        loc = db.StringField(max_length=100, required = True)
        name = db.StringField(max_length=100, required = True)
        items = db.EmbeddedDocumentListField(Item)

    class Cart(db.Document):
        item = db.EmbeddedDocumentField(Item)

    class SuperSection(db.Document):
        name = db.StringField(max_length = 100)
        sections = db.ListField(db.StringField(max_length=100))

    class BTsects(db.Document):
        btid = db.StringField(required=True, unique = True)
        section = db.StringField(max_length = 100)

    # a simple page that says hello
    @app.route('/hello')
    def hello():
        camera1 = Item(url="https://images-eu.ssl-images-amazon.com/images/I/51UHoxzInpL._AC_SX184_.jpg",name="Canon EOS 1500D 24.1", desc = "Canon EOS 1500D 24.1 Digital SLR Camera (Black) with EF S18-55 is II Lens, 16GB Card and Carry Case")
        camera2 = Item(url="https://images-eu.ssl-images-amazon.com/images/I/41+-LjzbkuL._AC_SX184_.jpg",name="Sony Alpha ILCE5100L 24.3MP", desc = "Sony Alpha ILCE5100L 24.3MP Digital SLR Camera (Black) with 16-50mm Lens with Free Case (Bag)")
        camera3 = Item(url="https://images-na.ssl-images-amazon.com/images/I/415ZSUQ2erL.jpg",name="Canon EOS 200D", desc = "Canon EOS 200D II 24.1MP Digital SLR Camera + EF-S 18-55mm is STM Lens + EF-S 55-250mm is STM Lens (Black)")
        camera4 = Item(url="https://images-eu.ssl-images-amazon.com/images/I/51QiHopSU8L._AC_SX184_.jpg",name="Sony Alpha ILCE 6000Y 24.3 MP ", desc = "Sony Alpha ILCE 6000Y 24.3 MP Mirrorless Digital SLR Camera with 16-50 mm and 55-210 mm Zoom Lenses (APS-C Sensor, Fast Auto Focus, Eye AF) - Black")
        cameraSection = Section(loc="C1", name="Cameras", items=[camera1, camera2, camera3, camera4]).save()

        phone1 = Item(url="https://images-eu.ssl-images-amazon.com/images/I/71OxJeyywSL._AC._SR360,460.jpg",name="Samsung Galaxy M31", desc = "Space Black, 6GB RAM, 128GB Storage")
        phone2 = Item(url="https://images-eu.ssl-images-amazon.com/images/I/61ACGAKmw3L._AC._SR360,460.jpg",name="Redmi Note 8 Pro",desc="Halo White, 6GB RAM, 128GB Storage with Helio G90T Processor")
        phone3 = Item(url="https://images-eu.ssl-images-amazon.com/images/I/415IOkCUtgL._AC._SR180,230.jpg",name="Vivo U10",desc="Electric Blue, 5000 mAH 18W Fast Charge Battery, 3GB RAM, 32GB Storage")
        phone4 = Item(url="https://images-eu.ssl-images-amazon.com/images/I/31Z2ee9oYQL._AC._SR180,230.jpg",name="Nokia 105 2019",desc="Single SIM, Black")
        phoneSection = Section(loc="P1",name="Mobiles", items=[phone1, phone2, phone3, phone4]).save()

        elecSect = SuperSection(name="Electronics",sections=['cameraSection', 'phoneSection']).save()

        return 'Hello, World!'

    @app.route('/bt/<btid>', methods=['GET'])
    def getSectionBT(btid):
        sec = BTsects.objects(btid=btid).first().section
        url = 'http://127.0.0.1:5000/section/'+sec
        resp = requests.get(url).text
        print(resp)
        return "trying"


    @app.route('/section/<superSectName>', methods=['GET'])
    def getsubSections(superSectName):
        sects = []
        for supersects in SuperSection.objects:
            if supersects.name==superSectName:
                for section in supersects.sections:
                    sects.append(section)
                
                jsonstr='{"name:": "'+superSectName+'", "sections": '+(json.dumps(sects))+'}'
                json_obj = (json.loads(jsonstr))
                return json_obj
        return "Error"


    @app.route('/section/sub/<sectName>', methods = ['GET'])
    def getSectionItems(sectName):
        sect = Section.objects(name=sectName).first()
        itemlist = []
        for item in sect.items:
            obj = {
                "url": item.url,
                "name": item.name,
                "desc": item.desc
            }
            itemlist.append(obj)
        
        jsonstr= '{"section": "'+sectName+'", "items": '+json.dumps(itemlist)+'}'
        return json.loads(jsonstr)




    @app.route('/location/<itemName>', methods=['GET'])
    def getLocation(itemName):
        for section in Section.objects:
            for item in section.items:
                if(item.name == itemName):
                    jsonobj = json.loads(json.dumps('{"loc": "'+section.loc+'"}'))
                    return jsonobj
        return 'Sorry not found'

    @app.route('/cart/add', methods=['POST'])
    def addToCart():
        json_obj = json.loads(json.dumps(request.form))
        itemName = json_obj['name']
        for cartItem in Cart.objects:
            if cartItem.item.name == itemName:
                return 'Already exists'
        for section in Section.objects:
            for item in section.items:
                if item.name == itemName:
                    cartItem = Cart(item = item).save()
                    return 'Added'
        return 'Error'

    @app.route('/cart/remove', methods=['POST'])
    def removeFromCart():
        json_obj = json.loads(json.dumps(request.form))
        itemName = json_obj['name']
        for cartItem in Cart.objects:
            if cartItem.item.name == itemName:
                cartItem.delete()
                return 'removed'
        return 'Error'


    @app.route('/cart/view', methods=['GET'])
    def viewCart():
        itemlist = []
        for cartItem in Cart.objects:
            obj = {
                "url": cartItem.item.url,
                "name": cartItem.item.name,
                "desc": cartItem.item.desc
            }
            itemlist.append(obj)
        
        jsonstr = '{"items": '+json.dumps(itemlist)+'}'
        return json.loads(jsonstr)

    return app