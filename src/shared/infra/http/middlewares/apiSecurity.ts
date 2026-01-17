import { Request, Response, NextFunction } from 'express';
import { securityConfig } from '../../../../config/security';

export function apiSecurity(
  req: Request,
  res: Response,
  next: NextFunction
) {
  /**
   * 1️⃣ API KEY VALIDATION
   */
  const apiKey = req.header('x-api-key');

  if (!apiKey || apiKey !== securityConfig.apiKey) {
    return res.status(401).json({
      error: 'UNAUTHORIZED',
      message: 'Invalid or missing API key',
    });
  }

  /**
   * 2️⃣ ORIGIN VALIDATION (only when present)
   */
  const origin = req.headers.origin;

  if (origin) {
    const isAllowed = securityConfig.allowedOrigins.includes(origin);

    if (!isAllowed) {
      return res.status(403).json({
        error: 'FORBIDDEN',
        message: 'Origin not allowed',
      });
    }
  }

  return next();
}
