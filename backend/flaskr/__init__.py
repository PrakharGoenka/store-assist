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

    #a simple page that says hello
    # @app.route('/hello')
    # def hello():
    #     bt = BTsects(btid="007", section="sect_name").save()
    #     bt2 = BTsects(btid="0409", section="sect_name2").save()
    #     # item1 = Item(url='url', name='name1', desc='desc')
    #     # item2 = Item(url='url', name='name2', desc='desc')
    #     # sect = Section(loc='loc', name='sect_name2', items=[item1, item2])
    #     # sect.save()
    #     # tmp = SuperSection(name='super', sections=['sect_name', 'sect_name']).save()
    #     return 'Hello, World!'

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
        print(sect.items)
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