FROM python:3.10-alpine

WORKDIR /api

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY app app
COPY .env .env

EXPOSE 8000

ENTRYPOINT [ "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]