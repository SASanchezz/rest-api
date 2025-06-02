import { DocumentBuilder } from "@nestjs/swagger";

export const SWAGGER_CONFIG = new DocumentBuilder()
  .setTitle("API Documentation")
  .setDescription("Test NestJS application")
  .setVersion("1.0")
  .addBearerAuth()
  .addTag("notes")
  .build();
