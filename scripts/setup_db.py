import json
import os
import psycopg2

from dotenv import load_dotenv

load_dotenv()

connection_args = {
    'dbname': os.getenv("PG_DATABASE"),
    'user': os.getenv("PG_USER"),
    'password': os.getenv("PG_PASSWORD"),
    'host': os.getenv("PG_HOST"),
    'port': os.getenv("PG_PORT")
}

def load_resource(file: str) -> dict:
    with open(file, 'r') as resource:
        return json.load(resource)


def compute_create_table_query(table: dict) -> str:
    name = table.get('name')
    columns = ', '.join(table.get('columns')) 
    constraints = table.get('constraints') 
    costraints_sql = ',' + ', '.join(constraints) if constraints else '' 
    query = f'create table if not exists {name} ({columns}{costraints_sql});'
    return query


def create_tables(connection, tables: list[dict]):
    with connection.cursor() as cursor:
        for table in tables:
            query = compute_create_table_query(table)
            cursor.execute(query)
    

def save_words(connection, words: list[str]):
    with connection.cursor() as cursor:
        query = 'insert into word(value) values(%s)'
        cursor.executemany(query, [(word,) for word in words])


def main() -> None:
    with psycopg2.connect(**connection_args) as connection:
        schema = load_resource(file='resources/schema.json')
        data = load_resource(file='resources/words.json')
        create_tables(connection, tables=schema['tables'])
        save_words(connection, words=data['words'])
        connection.commit()


if __name__ == '__main__':
    main()


