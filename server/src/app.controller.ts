import { Controller, Get } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, MqttContext, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern({ cmd: 'stream' })
  getNotifications(@Payload() data: number[], @Ctx() context: MqttContext) {
    console.log(`Topic: ${context.getTopic()}, packet: ${context.getPacket()}`);
  }
}
