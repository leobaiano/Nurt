export interface CheckHealthResult {
    status: 'ok' | 'degraded';
    database: 'up';
    indexes: 'ok' | 'missing';
  }