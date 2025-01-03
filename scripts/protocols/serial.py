import asyncio

import serial_asyncio


class SerialPortReaderProtocol(asyncio.Protocol):
    def connection_made(self, transport):
        self.transport = transport
    
    def data_received(self, data):
        print(f'received data: {data}')
        self.transport.pause_reading()
    
    def resume_reading(self):
        self.transport.resume_reading()        


async def reader(port: str):
    transport, protocol = await serial_asyncio.create_serial_connection(loop, SerialPortReaderProtocol, port, baudrate=9600)
    
    while True:
        await asyncio.sleep(0.3)
        protocol.resume_reading()
        
loop = asyncio.get_event_loop()
loop.run_until_complete(reader('COM7'))
loop.close()