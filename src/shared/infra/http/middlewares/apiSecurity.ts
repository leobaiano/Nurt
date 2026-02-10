import { Request, Response, NextFunction } from 'express';
import { createAuthStrategy } from '@/shared/infra/auth/AuthStrategyFactory';
import { HttpResponseBuilder } from '@/shared/infra/http/HttpResponse';

export async function apiSecurity(req: Request, res: Response, next: NextFunction) {
  const strategy = createAuthStrategy();
  const isAuthorized = await strategy.verify(req.headers);

  if (!isAuthorized) {
    return res.status(401).json(
      HttpResponseBuilder.error('UNAUTHORIZED', 'Invalid or missing authentication credentials')
    );
  }

  next();
}
