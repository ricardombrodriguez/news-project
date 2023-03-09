from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, EmailStr, constr, Field
from bson.objectid import ObjectId

class News(BaseModel):
    title: str
    description: str
    topic: str
    content: str = Field(...)
    author: str
    image: Optional[bytes]
    image_content_type: Optional[str]
    date: Optional[datetime]
    
    
    