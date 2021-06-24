import { Component } from '@angular/core';
import { IMqttMessage } from 'ngx-mqtt';
import { Subscription } from 'rxjs';
import { AppService } from './app.service';
import mq from './mqttClient.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  events: any[] = [];
  private deviceId: string = '';
  subscription: Subscription = new Subscription();

  constructor(
    private readonly appService: AppService,
  ) {
  }

  ngOnInit() {
    this.subscribeToTopic();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private subscribeToTopic() {
    this.subscription = this.appService.topic(this.deviceId)
      .subscribe((data: IMqttMessage) => {
        console.log(data);
        
        let item = JSON.parse(data.payload.toString());
        this.events.push(item);
      });
  }

  publish() {
    this.appService.publish().subscribe(res => console.log(res))
  }
}
