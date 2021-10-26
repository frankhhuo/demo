#!/bin/sh

#chmod +x docker/backend/wsgi-entrypoint.sh

util cd /app
do
    echo "Waiting for server volume..."
done

util ./manage.py migrate
do 
    echo "Waiting for db to be reading..."
    sleep 2
done

./manage.py collectstatic --noinput

gunicorn server.wsgi --bind 0.0.0.0:8000 --workers 2 --threads 2
