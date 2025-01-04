import asyncio
import websockets
import argparse 

async def send_word_to_server(uri: str, word: str):
    if not word:
        return
    
    async with websockets.connect(uri) as websocket:
        await websocket.send(word)

        
def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument('--uri', type=str, default='ws://localhost:8080', help='the uri used to establish a websocket connection')
    parser.add_argument('--word', type=str, help='the word to be send')
    args = parser.parse_args()
    asyncio.get_event_loop().run_until_complete(send_word_to_server(uri=args.uri, word=args.word))
    

if __name__ == '__main__':
    main()