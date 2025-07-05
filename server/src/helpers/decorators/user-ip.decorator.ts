import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserIp = createParamDecorator((_data: unknown, ctx: ExecutionContext): string => {
  const request = ctx.switchToHttp().getRequest();

  const xForwardedFor = request.headers['x-forwarded-for'];
  if (typeof xForwardedFor === 'string') {
    const forwardedIps = xForwardedFor.split(',').map(ip => ip.trim());
    if (forwardedIps.length) {
      return forwardedIps[0];
    }
  }

  return request.ip || request.connection?.remoteAddress || request.socket?.remoteAddress || request.connection?.socket?.remoteAddress || '';
});
