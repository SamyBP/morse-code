# Scripts

Utility scipts used to test and/or mock the behaviour of certain components

## Setup

#### Optional: create a virtual env

    >> python -m venv .venv
    >> .\venv\Scripts\activate

#### Install the required dependecies:

    >> pip install -r requirements.txt

#### Create a PostgreSQL database:

    >> psql -U <user> -c "create database <choose_db_name>"

## Usages


#### 1. Setup the database schema and add some data

    >> python setup_db.py


* The schema is taken from [schema.json](resources/schema.json) and the data from [words.json](resources/words.json)
* The script uses the following environment variables in order to connect to the database:

        PG_USER=
        PG_HOST=
        PG_DATABASE=
        PG_PASSWORD=
        PG_PORT=

##

#### 2. Test that the server returns a random word at /api/words

    >> python get_random.py --host <server_host> --path /api/words

* If host is not specified it will default to localhost:3000


## 

#### 3. Send data through the websocket

    >> python send_ws.py --uri <websocket_uri> --word <word_to_send>

* If uri is not specified it will default to ws://localhost:8080