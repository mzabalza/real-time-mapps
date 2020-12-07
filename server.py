from flask import Flask, render_template, Response
from pykafka import KafkaClient

def get_kafka_client():
    return KafkaClient(hosts="127.0.0.1:9092")


app = Flask(__name__)


@app.route('/')
def index():
    return(render_template('index.html'))

@app.route('/topic/<topicname>')
def get_messages(topicname):
    client = get_kafka_client()
    def events():
        for message in client.topics[topicname].get_simple_consumer():
            yield f'data:{message.value.decode()}\n\n'
    return Response(events(), mimetype="text/event-stream")

if __name__ == '__main__':
    app.run(debug=True, port=5005)