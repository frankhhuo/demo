# Demo app using Django and React
Follow the following steps to run:

$conda create -n demo
$conda install -n demo python=3.8.8 
$conda activate demo
$pip install -r requirements.txt

$python manage.py makemigrations
$python manage.py migrate
$python manage.py collectstatic

$ cd frontend
$npm install
$npm run-script build 
$sudo npm install -g serve
$ serve -s build &

# Deployment (in progress)
#nginx
#edit /etc/nginx/nginx.conf
#create demo/run demo/log folders

1. shared To-Do list

Feature: 
## User Auth
1. User registration, login/logout
2. User password reset
3. email feature
## Model
Todo is shared among multiple people, readonly views are totally fine (auto-check for new posts/update?). Creating a new post is also fine. But modifying an exsiting post, need to deal with concurrency (provide a timestamp in the form, when submitted if the timestamp is different, raise warning), in the db level, use transaction.atomic to ensure atomic transanction.
use timezone
1. Model fields include: title, desc, completed (complete, in-progress, not started), last_modified_on (timestamp), archived.
2. from should have a clean method to verify against last updated timestamp. if  the tiemstamp is different from what was checked out, raise a warning of what has been chagned.
3. in listview/update view, check every 5 minuts to see if there are new updates to the same post and refresh the listview, and add a warning to the update view.

## test 

## template use django template


## safety concerns, encryption, https

## 3rd party login

## responsive css

## databackup, when scaling up...

## caching

## deployment:
# nginx, uwsgi, domain name

2. Tic Tac Toe
used react for front end. not communicating to the backend.  currently not supporting online players.

3. to run:

