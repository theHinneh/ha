import * as mqtt from "mqtt";
import { environment as env } from '../environments/environment';

class MqttClient {
    client: any
    handlers: any
    constructor() {

        // connect to mqtt server
        this.client = mqtt.connect(env.mqtt.server);

        // save subscribes here with topics as keys and handlers as values
        this.handlers = [];

        // listen for successful connection
        this.client.on("connect", () => {
            // subscribe to every possible topic
            this.client.subscribe(env.TOPICS.PERSON);
            this.client.subscribe(env.TOPICS.DURATION);
            this.publish("presence", "hello from react");

            console.log("connected to " + env.mqtt.server);
        });

        // listen for mqtt messages
        this.client.on("message", (topic: any, message: any) => {
            /*console.log( topic, message );*/
            let m = JSON.parse(message.toString());
            // call all registered handlers
            this.handlers.forEach((h: any) => {
                h.func(topic, m);
            });
        });
    }

    addHandler(id: any, handler: any) {
        this.handlers.push({ id, func: handler });
    }

    removeHandler(id: any) {
        this.handlers = this.handlers.filter((h: any) => {
            return h.id === id ? false : true;
        });
    }

    publish(topic: any, payload: any) {
        const p = payload || {};
        this.client.publish(topic, JSON.stringify(p));
    }
}

export default (new MqttClient);
