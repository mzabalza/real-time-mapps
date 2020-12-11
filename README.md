# REAL TIME MAPP WITH KAFKA SOCKET.IO AND MAPBOX GL JS


<p align="center"><img  src="readme/trafi_data.gif"></p>
<p align="center"><img  src="readme/bus_ride.gif"></p>

[Work in progress...]


## Table of contents
* [General info](#general-info)
* [Building Blocks](#building-blocks)
* [Technologies](#technologies)
* [Inspiration](#inspiration)


## General info

## Building blocks

* REAL TIME DATA PROVIDER: Kafka
* SERVICE PROVIDER: Node service with Express JS and socket.io
* CLIENT: React, Mapbox GL JS (npm package)


## REAL TIME DATA PROVIDER: Kafka
### Setup (for Mac users)

* 1. Install kafka 
```
brew cask install java
brew install kafka
```
* 2. Launch zookeeper and kafka servers
```
zookeeper-server-start /usr/local/etc/kafka/zookeeper.properties & kafka-server-start /usr/local/etc/kafka/server.properties
```

During server start, you might be facing connection broken issue.
To fix this issue, we need to change the server.properties file.
```
vim /usr/local/etc/kafka/server.properties
```
Here uncomment the server settings and update the value from
```
listeners=PLAINTEXT://:9092
```
to
```
############################# Socket Server Settings #############################
# The address the socket server listens on. It will get the value returned from 
# java.net.InetAddress.getCanonicalHostName() if not configured.
#   FORMAT:
#     listeners = listener_name://host_name:port
#   EXAMPLE:
#     listeners = PLAINTEXT://your.host.name:9092
listeners=PLAINTEXT://localhost:9092
```
and restart the server

* 3. Create a folder for storing both kafka and zookeeper logs
```
mkdir data
cd data
mdkir kafka zookeeper
```

* 4. Change server and zookeeper properties to redirect logs to newly created files:
```
vim /usr/local/etc/kafka/zookeeper.properties
16 dataDir=/usr/local/etc/kafka/data/zookeeper
```
```
vim /usr/local/etc/kafka/server.properties
60 log.dirs=/usr/local/etc/kafka/data/kafka
```

* 5. Create a Kafka topic

Inside kafka folder run:
```
cd /usr/local/etc/kafka
kafka-topics --zookeeper 127.0.0.1:2181 --topic geodata_final --create --partitions 1 --replication-factor 1
```

See properties of a given topic:
```
kafka-topics --zookeeper 127.0.0.1:2181 --topic geodata_final --describe
```

* 6. Create a Kafka CLI Producer 
```
kafka-console-producer --broker-list 127.0.0.1:9092 --topic geodata_final
```

* 7. Create a Kafka CLI Consumer
```
kafka-console-consumer --bootstrap-server 127.0.0.1:9092 --topic geodata_final --from-beginning
```

## Python Kafka Producer

Before starting with python its recommended to create a environment for the project and install there all required dependencies:

```
virtualenv env
source env/bin/activate
```
```
pip install -r requirements.txt
```

Through the module pykafka The python script creates a kafka client that is able to produce data that will be streamed through the newly created topic 'geodata_final'. The script busdayata1.py takes data from a json file containing several points of a bus ride and sends them to kafka one by one each second simulating the cycle of a bus. Instead of taking data from a static file, the data could come from an external api.

```python
from pykafka import KafkaClient
import json
from datetime import datetime
import uuid
import time
from itertools import cycle

# INPUT FILE
input_file = open('./data/bus1.json')
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

```



## Inspiration
* https://www.youtube.com/watch?v=xiouigXHqdE&list=PL2UmzTIzxgL7Bq-mW--vtsM2YFF9GqhVB&index=5&ab_channel=Code%26Dogs
* https://github.com/juliannemarik/Mapbox-Wrapper
