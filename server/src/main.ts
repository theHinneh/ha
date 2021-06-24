import { INestMicroservice } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app: INestMicroservice = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule, {
    transport: Transport.MQTT,
    options: {
      host: 'http://localhost',
      // hostname: 'broker.hivemq.com',
      port: 1883,
      protocol: 'mqtt'
    },
  });
  // app.listen(() => console.log('Microservice is listening'));
}
bootstrap();
