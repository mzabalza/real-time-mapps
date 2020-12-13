from pykafka import KafkaClient
import json
from datetime import datetime
import uuid
import time
from itertools import cycle 

# INPUT DATA
with open('../paris-data-api/ci_trafi.json', 'r') as f:
    data0 = json.load(f)
with open('../paris-data-api/ci_trafi_1607642891.json', 'r') as f:
    data1 = json.load(f)
with open('../paris-data-api/ci_trafi_1607642898.json', 'r') as f:
    data2 = json.load(f)
with open('../paris-data-api/ci_trafi_1607648259.json', 'r') as f:
    data3 = json.load(f)
with open('../paris-data-api/ci_trafi_1607648259.json', 'r') as f:
    data4 = json.load(f)
with open('../paris-data-api/ci_trafi_1607648261.json', 'r') as f:
    data5 = json.load(f)
with open('../paris-data-api/ci_trafi_1607648255.json', 'r') as f:
    data6 = json.load(f)


data = {
    0: data0,
    1: data1,
    2: data2,
    3: data3,
    4: data4,
    5: data5,
    6: data6,
}


# KAFKA PRODUCER
client = KafkaClient(hosts="127.0.0.1:9092")
topic = client.topics['geodata_final']
producer = topic.get_sync_producer()

# CONSTRUCT MESSAGE AND SEND IT TO KAFKA
def generate_checkpoint():
    i = 0
    while True:
        message = json.dumps(data[i])
        producer.produce(message.encode('ascii'))
        print(i)
        i += 1
        time.sleep(1)
        if i == 6:
            i = 0
            
generate_checkpoint()
