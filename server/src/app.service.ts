import { Inject, Injectable, Logger } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  @Client({ transport: Transport.MQTT })
  public client: ClientProxy;

  constructor() { }

  getHello(): string {
    return 'Hello World!';
  }

  public async onModuleInit(): Promise<void> {
    Logger.log("Connecting");
    await this.client.connect();
    Logger.log("Connected");
  }

  public sendMessage(): Observable<number> {
    const pattern: {} = { cmd: "sum" };
    const data: number[] = [5, 6];

    return this.client.send<number>(pattern, data);
  }
}
