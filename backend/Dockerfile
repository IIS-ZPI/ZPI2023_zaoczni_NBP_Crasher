FROM python:3.12

COPY ./ /code/app

WORKDIR /code/app

RUN pip install --no-cache-dir --upgrade -r /code/app/requirements.txt

# Temporary to test if container is running correctly
CMD ["tail", "-f", "/dev/null"]