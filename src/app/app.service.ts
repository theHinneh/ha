import { Injectable } from '@angular/core';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private endpoint: string;
  constructor(private mqttService: MqttService,) {
    this.endpoint = 'person';
  }

  topic(deviceId: string): Observable<IMqttMessage> {
    console.log(deviceId, this.endpoint);
    
    let topicName = `/${this.endpoint}/${deviceId}`;
    // let topicName = `/${this.endpoint}/stream`;
    return this.mqttService.observe(topicName);
  }

  publish() {
    return this.mqttService.publish('presence', 'Angular connected')
  }
}
