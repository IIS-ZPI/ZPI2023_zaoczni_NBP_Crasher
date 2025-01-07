FROM python:3.12

COPY ./ /code/app

WORKDIR /code/app

RUN pip install --no-cache-dir --upgrade -r /code/app/requirements.txt

CMD ["python","fastAPI.py"]

EXPOSE 8000