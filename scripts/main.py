import os
import serial_asyncio
import asyncio

from protocols.http import send_word_to_server
from protocols.serial import SerialPortReaderProtocol


SERVER_WORDS_API = os.getenv('SERVER_WORDS_API', default='http://127.0.0.1:3000/api/words')
reader_protocol = SerialPortReaderProtocol(handler=send_word_to_server, url=SERVER_WORDS_API)

async def reader(port: str):
    _, protocol = await serial_asyncio.create_serial_connection(loop, lambda: reader_protocol, port, baudrate=9600)

    while True:
        await asyncio.sleep(0.3)
        protocol.resume_reading()
    
loop = asyncio.get_event_loop()
loop.run_until_complete(reader('COM5'))
loop.close()