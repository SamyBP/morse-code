import requests
import argparse


def get_random_word_from_server(url: str):
    response = requests.get(url)
    
    if not response.ok:
        raise requests.HTTPError(str(response.content))
    
    return response.json()


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--host', type=str, default='http://localhost:3000', help='the host of the server')
    parser.add_argument('--path', type=str, help='the path of the server\'s GET handler')
    args = parser.parse_args()
    try:
        url = f'{args.host}/{args.path}'
        print(f'Making request: GET {url}')
        response = get_random_word_from_server(url)
        print(f'Recieved from server: {response}')
    except requests.HTTPError as e:
        print(e.__str__())


if __name__ == '__main__':
    main()