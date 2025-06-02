import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtPayload } from 'src/jwt/jwt-payload.type';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject() private readonly jwtService: JwtService,
    @Inject() private readonly configService: ConfigService,
    @Inject() private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    const payload = await this.tryRetrievePayload(token);
    await this.validateUser(payload);
    
    request['user'] = payload;

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private async tryRetrievePayload(token: string): Promise<JwtPayload | null> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: this.configService.getOrThrow<string>('JWT_SECRET'),
      }) as JwtPayload;

    } catch {
      throw new UnauthorizedException();
    }
  }

  private async validateUser(payload: JwtPayload): Promise<any> {
    const user = await this.userService.findById(payload.userId);

    if (!user) {
      throw new UnauthorizedException();
    }
  }
}