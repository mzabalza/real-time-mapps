from pykafka import KafkaClient
import json
from datetime import datetime
import uuid
import time
from itertools import cycle 


# INPUT DATA
input_file = open('../data/bus1.json')
json_array = json.load(input_file)
coordinates = json_array['features'][0]['geometry']['coordinates']



# KAFKA PRODUCER
client = KafkaClient(hosts="127.0.0.1:9092")
topic = client.topics['geodata_final']
producer = topic.get_sync_producer()

# CONSTRUCT MESSAGE AND SEND IT TO KAFKA
def generate_checkpoint(coordinates):
    i = 0
    while i < len(coordinates):
        data = {
            'busline': '00001',
            'key': f'00001_{uuid.uuid4()}',
            'timestamp': str(datetime.utcnow()),
            'latitude': coordinates[i][1],
            'longitude': coordinates[i][0]
        }
        message = json.dumps(data)
        producer.produce(message.encode('ascii'))
        print(i, message)

        i += 1
        time.sleep(1)
        if i == len(coordinates):
            i = 0

            
generate_checkpoint(coordinates)
