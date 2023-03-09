from datetime import datetime
from fastapi import Depends, HTTPException, status, APIRouter, Response
from pymongo.collection import ReturnDocument
from app.models import schemas
from app.database import News
from bson.objectid import ObjectId
from pymongo.errors import DuplicateKeyError




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
