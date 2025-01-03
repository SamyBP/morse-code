import asyncio

from requests import HTTPError


class SerialPortReaderProtocol(asyncio.Protocol):
    
    def __init__(self, handler, url):
        super().__init__()
        self.handler = handler
        self.url = url
    
    def connection_made(self, transport):
        self.transport = transport
    
    def data_received(self, data):
        print(f'received data: {data}')
        try:
            response = self.handler(url=self.url, word=data)
            print(response)
        except HTTPError as http_error:
            print(http_error.__str__())

        self.transport.pause_reading()
    
    def resume_reading(self):
        self.transport.resume_reading()        
