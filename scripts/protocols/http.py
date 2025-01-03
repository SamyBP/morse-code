import requests

def send_word_to_server(url: str, word: str):
    if not word:
        return
    
    payload = {'value': word} 
    response = requests.post(url, json=payload)
    
    if not response.ok:
        raise requests.HTTPError(str(response.content))
    
    return response.json()