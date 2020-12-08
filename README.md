# REAL TIME MAPP WITH KAFKA FLASK AND LEAFLET.JS
[Work in progress...]

## Table of contents
* [General info](#general info)
* [Building Blocks](#building blocks)
* [Technologies](#technologies)
* [Setup](#setup)
* [Inspiration](#inspiration)

Project is created with:
* KAFKA - streaming data
* LEAFLET.js - data consumer

## General info

## Building blocks

* REAL TIME DATA PROVIDER: Kafka
* SERVICE PROVIDER: Node service with Express JS and socket.io
* CLIENT: React, no-kafka (npm package)


## Setup (for Mac users)

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
kafka-topics --zookeeper 127.0.0.1:2181 --topic test_topic --create --partitions 1 --replication-factor 1
```

See properties of a given topic:
```
kafka-topics --zookeeper 127.0.0.1:2181 --topic test_topic --describe
```

* 6. Create a Kafka CLI Producer 
```
kafka-console-producer --broker-list 127.0.0.1:9092 --topic test_topic
```

* 7. Create a Kafka CLI Consumer
```
kafka-console-consumer --bootstrap-server 127.0.0.1:9092 --topic test_topic --from-beginning
```

## PYTHON

Before starting with python its recommend to create a environment for the project and install there all required dependencies:

```
virtualenv env
source env/bin/activate
```
```
pip install pykafka
```

* 8. Create a Python Kafka Producer


## Inspiration
https://www.youtube.com/watch?v=xiouigXHqdE&list=PL2UmzTIzxgL7Bq-mW--vtsM2YFF9GqhVB&index=5&ab_channel=Code%26Dogs
