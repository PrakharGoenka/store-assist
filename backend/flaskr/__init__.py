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

    class Homepage(db.Document):
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

        #Apparel,Groceries,Furniture,Beauty
        btapparel=BTsects(btid="001",section="Apparel").save()
        btapparel=BTsects(btid="002",section="Groceries").save()
        btapparel=BTsects(btid="003",section="Furniture").save()
        btapparel=BTsects(btid="004",section="Beauty").save()


        # top1 = Item(url="https://m.media-amazon.com/images/I/61yZJiJvgoL._AC_UL480_QL65_.jpg",name="Skinn by Titan", desc = "Raw Perfume For Men, 100ml")
        # top2 = Item(url="https://m.media-amazon.com/images/I/81l2CbIMl0L._AC_UL480_QL65_.jpg",name="Adidas Ice Dive Eau De Toilette", desc = " For Men, 100ml")
        # top3 = Item(url="https://m.media-amazon.com/images/I/91QvfXZ4aVL._AC_UL480_QL65_.jpg",name="Men's Solid Regular Fit T-Shirt", desc = "Best Fit, For Sports")
        # top4 = Item(url="https://m.media-amazon.com/images/I/81wyC4uxwDL._AC_UL480_QL65_.jpg",name="Britannia Good Day Cashew", desc = "200g biscuits")
        # top5 = Item(url="https://m.media-amazon.com/images/I/61mKvVG+gmL._AC_UL480_QL65_.jpg",name="Portronics POR-857 My Buddy",desc="A Hydraulic Piston Fitted Height Adjustable Laptop Stand (White)")
        # topSection = Section(loc="NA", name="Top5", items=[top1, top2, top3, top4, top5]).save()

        # tshirt1 = Item(url="https://m.media-amazon.com/images/I/91QvfXZ4aVL._AC_UL480_QL65_.jpg",name="Men's Solid Regular Fit T-Shirt", desc = "Best Fit, For Sports")
        # tshirt2 = Item(url="https://m.media-amazon.com/images/I/81NXw8FQ2-L._AC_UL480_QL65_.jpg",name="Men's Cotton T-Shirt", desc = "Jockey, Cotton")
        # tshirt3 = Item(url="https://m.media-amazon.com/images/I/819Cja8v6XL._AC_UL480_QL65_.jpg",name="Men's Solid Regular Fit T-Shirt Sleeve", desc = "Van Heusen Athleisure")
        # tshirt4 = Item(url="https://m.media-amazon.com/images/I/81Yqx-u2z4L._AC_UL480_QL65_.jpg",name="Men's Polo",desc="AllenSolly")
        # TshirtSection = Section(loc="T1",name="TShirts",items=[tshirt1,tshirt2,tshirt3,tshirt4]).save()

        # jeans1 = Item(url="https://m.media-amazon.com/images/I/616xchp1ECL._AC_UL480_QL65_.jpg",name="Men's Relaxed Jeans",desc="Ben Martin")
        # jeans2 = Item(url="https://m.media-amazon.com/images/I/812iG5h2AQL._AC_UL480_QL65_.jpg",name="Men's Jeans",desc="Max")
        # jeans3 = Item(url="https://m.media-amazon.com/images/I/81rcMJm4kFL._AC_UL480_QL65_.jpg",name="Men's Slim Fit Stretchable Jeans")
        # JeansSection = Section(loc="J1",name="Jeans",items=[jeans1,jeans2, jeans3]).save()

        # apparelsSect = SuperSection(name="Apparel",sections=["TShirts", "Jeans"]).save()


        # bis1=Item(url="https://m.media-amazon.com/images/I/81wyC4uxwDL._AC_UL480_QL65_.jpg",name="Britannia Good Day Cashew", desc = "200g biscuits")
        # bis2=Item(url="https://m.media-amazon.com/images/I/819bDz6Q9DL._AC_UL480_QL65_.jpg",name="Sunfeast Mom's Magic",desc="Cashew and Almond, 600g") 
        # bis3=Item(url="https://m.media-amazon.com/images/I/71GPNxlsgZL._AC_UL480_QL65_.jpg",name="Sunfeast Dark Fantasy",desc="Bourbon Bliss, 150g")
        # bis4=Item(url="https://m.media-amazon.com/images/I/51qHxF-NgsL._AC_UL480_QL65_.jpg",name="Dark Fantasy Choco Fills",desc="Tasty, 300g")
        # BisSect=Section(loc="G1",name="Biscuits",items=[bis1,bis2,bis3,bis4]).save()

        # Grocery=SuperSection(name="Groceries",sections=['Biscuits']).save()

        # furn1=Item(url="https://m.media-amazon.com/images/I/51EsMEAiQYL._AC_UL480_QL65_.jpg",name="Brand Enterprise SOFLIN 5 in 1",desc="Inflatable 3-Seater Queen Size Sofa Cum Bed with Pump")
        # furn2=Item(url="https://m.media-amazon.com/images/I/71lyvDlj5PL._AC_UL480_QL65_.jpg",name="Coirfit Folding Sofa Cum Bed",desc="Perfect for Guests")
        # furn3=Item(url="https://m.media-amazon.com/images/I/71MMzmmLMiL._AC_UL480_QL65_.jpg",name="Furny Herostyle 3 Seater Sofa",desc="(Grey-Black)")
        # furn4=Item(url="https://m.media-amazon.com/images/I/61mKvVG+gmL._AC_UL480_QL65_.jpg",name="Portronics POR-857 My Buddy",desc="A Hydraulic Piston Fitted Height Adjustable Laptop Stand (White)")
        # FrunSect=Section(loc="F1",name="Stylish Furniture",items=[furn1,furn2,furn3,furn4]).save()
        # SuperFurn=SuperSection(name="Furniture",sections=['Stylish Furniture']).save()

        # trend1=Item(url="https://m.media-amazon.com/images/I/812iG5h2AQL._AC_UL480_QL65_.jpg",name="Men's Jeans",desc="Max")
        # trend2=Item(url="https://m.media-amazon.com/images/I/81Yqx-u2z4L._AC_UL480_QL65_.jpg",name="Men's Polo",desc="AllenSolly")
        # trend3=Item(url="https://m.media-amazon.com/images/I/51EsMEAiQYL._AC_UL480_QL65_.jpg",name="Brand Enterprise SOFLIN 5 in 1",desc="Inflatable 3-Seater Queen Size Sofa Cum Bed with Pump")
        # trend4=Item(url="https://m.media-amazon.com/images/I/61oYfImcEoL._AC_UL480_QL65_.jpg",name="Liril Lemon and Tea Tree Oil Soap",desc="125 g (Buy 3 Get 75g Free)")
        # Trending=Homepage(loc="NA", name="Trending", items=[trend1,trend2,trend3,trend4]).save()



        # phone1 = Item(url="https://m.media-amazon.com/images/I/51EspAFAcQL._AC_UL480_QL65_.jpg",name="Pears Soft and Fresh Bathing Bar", desc = "125g (Buy 3 Get 1 Free)")
        # phone2 = Item(url="https://m.media-amazon.com/images/I/61oYfImcEoL._AC_UL480_QL65_.jpg",name="Liril Lemon and Tea Tree Oil Soap",desc="125 g (Buy 3 Get 75g Free)")
        # phone3 = Item(url="https://m.media-amazon.com/images/I/714LxZtecNL._AC_UL480_QL65_.jpg",name="Santoor Sandal and Almond Milk Soap",desc="(Buy 4 Get 1 Free 125g each)")
        # phone4 = Item(url="https://m.media-amazon.com/images/I/71b5SRkcr5L._AC_UL480_QL65_.jpg",name="NIVEA Soap",desc="Creme Soft, For Hands And Body, 125g (BUY 2 GET 2)")
        # soapSection = Section(loc="B2",name="Soaps", items=[phone1, phone2, phone3, phone4]).save()

        # elecSect = SuperSection(name="Beauty",sections=['creamSection', 'soapSection']).save()

        return 'Hello, World!'

    @app.route('/home', methods=['GET'])
    def getHome():
        jsonstr={}
        for sect in Homepage.objects:
            itemlist=[]
            for item in sect.items:
                obj = {
                    "url": item.url,
                    "name": item.name,
                    "desc": item.desc
                }
                itemlist.append(obj)
            jsonstr[sect.name]=itemlist

        return json.loads(json.dumps(jsonstr))
            
            

    @app.route('/bt/<btid>', methods=['GET'])
    def getSectionBT(btid):
        sec = BTsects.objects(btid=btid).first().section
        url = 'http://127.0.0.1:5000/section/'+sec
        resp = requests.get(url).text
        return resp


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
        json_obj = request.json
        print(json_obj)
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
        json_obj = request.json
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