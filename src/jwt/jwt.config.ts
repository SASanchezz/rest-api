import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModuleAsyncOptions } from "@nestjs/jwt";

export const jwtModuleConfig: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    secret: configService.getOrThrow<string>("JWT_SECRET"),
    signOptions: {
      expiresIn: configService.get<string>("JWT_EXPIRES_IN") || "1h",
    },
  }),
  inject: [ConfigService],
};
