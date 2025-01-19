FROM python:3.12

COPY ./ /code/app/backend

WORKDIR /code/app

ENV PYTHONPATH=/code/app

RUN pip install --no-cache-dir --upgrade -r /code/app/backend/requirements.txt

CMD ["python","backend/fastAPI.py"]

EXPOSE 8000