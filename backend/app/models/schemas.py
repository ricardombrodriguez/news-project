from datetime import datetime
from typing import List
from pydantic import BaseModel, EmailStr, constr
from bson.objectid import ObjectId

class News(BaseModel):
    title: str
    description: str
    content: str
    author: str
    image: str
    date: datetime
    
    
    