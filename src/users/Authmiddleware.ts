import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
declare module 'express-serve-static-core' {
  interface Request {
    decoded?: any;
  }
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (token) {
      const noBearer = token.replace(/bearer\s/gi, '');
      const decoded = this.jwtService.verify(noBearer, {
        secret: 'process.env.SECRET',
      });
      req.decoded = decoded;
      return next();
    }
    return res.status(404).json({ msg: 'authourzation token not found' });
  }
}
