from pymongo import mongo_client
from pymongo import MongoClient
import pymongo
from app.core.config import settings

client = mongo_client.MongoClient(settings.DATABASE_URL)
print('Connected to MongoDB...')

db = client[settings.DATABASE_NAME]

News = db.news
Teste = db['collection_teste']