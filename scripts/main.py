import os

from requests import HTTPError

from protocols.http import send_word_to_server


def main() -> None:
    SERVER_WORDS_API = os.getenv('SERVER_WORDS_API', default='http://127.0.0.1:3000/api/words')
    try:
        response = send_word_to_server(url=SERVER_WORDS_API, word="PONG")
        print(response)
    except HTTPError as http_error:
        print(http_error.__str__())
    

if __name__ == '__main__':
    main()