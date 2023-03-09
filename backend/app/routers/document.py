from datetime import datetime
from fastapi import Depends, HTTPException, status, APIRouter, Response, UploadFile, File
from pymongo.collection import ReturnDocument
from app.models import schemas
from app.database import News, Teste
from bson.objectid import ObjectId
from pymongo.errors import DuplicateKeyError
import base64
from bson.binary import Binary


router = APIRouter()

@router.get("/news", response_model=schemas.News)
def get_news():
    news = News.find_one()
    return news


@router.post("/news", response_model=schemas.News)
def create_news(news: schemas.News):
    try:
        News.insert_one(news.dict())
    except DuplicateKeyError:
        raise HTTPException(status_code=400, detail="News already exists")
    return news

@router.delete("/news", response_model=schemas.News)
def delete_all_news():
    News.delete_many({})
    return Response(status_code=status.HTTP_204_NO_CONTENT)







@router.post("/teste")
async def post_image(file: UploadFile = File(...)):
    
    print(file.filename)
    print(file.content_type)
    file_data = await file.read()
    
    binary_data = Binary(file_data)
    print("converteu para binario", binary_data)

    Teste.insert_one({"image": binary_data})
    print("inseriu na base de dados")
    
    return Response(status_code=status.HTTP_201_CREATED)

@router.get("/teste")
def get_all_images():
    images = Teste.find({})
    return images
    
    
    
    
    