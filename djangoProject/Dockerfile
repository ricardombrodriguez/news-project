FROM python:3.8

ENV PYTHONUNBUFFERED 1

WORKDIR /projBackend

COPY requirements.txt /projBackend/

RUN pip3 install -r requirements.txt

COPY . /projBackend/

ENV DJANGO_SUPERUSER_USERNAME=admin
ENV DJANGO_SUPERUSER_EMAIL=admin@example.com
ENV DJANGO_SUPERUSER_PASSWORD=admin

EXPOSE 8000

#RUN python3 manage.py makemigrations app && python3 manage.py migrate

ENTRYPOINT [ "python3", "manage.py", "runserver", "0.0.0.0:8000" ]
