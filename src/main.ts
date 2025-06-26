import { ConsoleLogger, INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as session from 'express-session';

import { AppModule } from './app.module';
class AppFactory {
  app: INestApplication;

  constructor() {
    this.app = null
  }

  async create() {
    this.app = await NestFactory.create(AppModule, {
      logger: new ConsoleLogger({
        json: false,
      }),
    });
  }

  initMiddlewares() {
    this.app.use(
      session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false },
      }),
    );


    this.app.enableCors({
      origin: 'http://localhost:3000',
      methods: 'GET,PUT,POST,DELETE, OPTIONS',
      allowedHeaders: 'Content-Type, Authorization',
    });

    this.app.setGlobalPrefix('api/v1');
  }

  initSwagger() {
    const config = new DocumentBuilder()
      .setTitle('CRUD example')
      .setDescription('The CRUD project boilerplate ')
      .setVersion('1.0')
      .build();

    const documentFactory = () => SwaggerModule.createDocument(this.app, config);

    SwaggerModule.setup('playground', this.app, documentFactory);
  }

  startApp() {
    this.app.listen(process.env.PORT, () => {
      console.log(`Application is running on: ${process.env.PORT}`);
    });
  }
}

async function bootstrap() {
  const appFactory = new AppFactory();
  await appFactory.create();
  appFactory.initMiddlewares();
  appFactory.initSwagger();
  appFactory.startApp();
}

bootstrap();
