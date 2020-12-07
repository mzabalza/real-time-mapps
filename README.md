# REAL TIME MAPP WITH KAFKA FLASK AND LEAFLET.j
[Work in progress...]

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Inspiration](#inspiration)

Project is created with:
* KAFKA - streaming data
* LEAFLET.js - data consumer


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

* 5. Create Kafka topic