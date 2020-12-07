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