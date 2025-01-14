import asyncio
import websockets

morse_code_dict = {
    "A": ".-",    "B": "-...",  "C": "-.-.",  "D": "-..",   "E": ".",
    "F": "..-.",  "G": "--.",   "H": "....",  "I": "..",    "J": ".---",
    "K": "-.-",   "L": ".-..",  "M": "--",    "N": "-.",    "O": "---",
    "P": ".--.",  "Q": "--.-",  "R": ".-.",   "S": "...",   "T": "-",
    "U": "..-",   "V": "...-",  "W": ".--",   "X": "-..-",  "Y": "-.--",
    "Z": "--.."
}

def encode(word: str) -> str:
    return " ".join(morse_code_dict[c] for c in word)


async def client(uri: str):
    try:
        async with websockets.connect(uri) as socket:
            print(f"connected to websocket {uri}")
            async for message in socket:
                if message.startswith("encode"):
                    print("received word to encode")
                    word = message.split(":", 1)[1]
                    encoded = encode(word=word.upper())
                    await socket.send(f"result:{encoded}")
                    print(f"sent back: {encoded}")
    except Exception as e:
        print(e.__str__())
        

def main():
    uri = "ws://localhost:8080"
    asyncio.run(client(uri))
    

if __name__ == "__main__":
    main()