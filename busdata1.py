from pykafka import KafkaClient
import json
from datetime import datetime
import uuid
import time

input_file = open('./data/bus1.json')
json_array = json.load(input_file)
coordinates = json_array['features'][0]['geometry']['coordinates']



# KAFKA PRODUCER
client = KafkaClient(hosts="127.0.0.1:9092")
topic = client.topics['geodata_final']
producer = topic.get_sync_producer()

# CONSTRUCT MESSAGE AND SEND IT TO KAFKA
def generate_checkpoint(coordinates):
    for i, coordinate in enumerate(coordinates):
        data = {
            'busline': '00001',
            'key': f'00001_{uuid.uuid4()}',
            'timestamp': str(datetime.utcnow()),
            'latitude': coordinates[i][1],
            'longitude': coordinates[i][0]
        }
        message = json.dumps(data)
        producer.produce(message.encode('ascii'))
        print(message)
        time.sleep(2)


generate_checkpoint(coordinates)
