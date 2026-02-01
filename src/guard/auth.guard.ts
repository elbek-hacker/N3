import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { envConfig } from "src/config";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const auth = req.headers.authorization;

    if (!auth) {
      throw new UnauthorizedException('Token not provided');
    }

    const [bearer, token] = auth.split(' ');
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid token format');
    }

    try {
      const data = this.jwt.verify(token, {
        secret: envConfig.TOKEN_KEY,
      });

      if (!data?.isActive) {
        throw new UnauthorizedException('User is not active');
      }

      req.user = data; // MUHIM
      return true;
    } catch (err) {
      throw new UnauthorizedException('Token expired or invalid');
    }
  }
}
