from pymongo import MongoClient

client = MongoClient("mongodb+srv://dbuser:dbpass123@cluster0.qple4.gcp.mongodb.net/>?retryWrites=true&w=majority")
db = client.testdb

posts = db.testcol
post_data = {
    'title': 'Python and MongoDB',
    'content': 'PyMongo is fun, you guys',
    'author': 'Scott'
}
result = posts.insert_one(post_data)
print('One post: {0}'.format(result.inserted_id))
