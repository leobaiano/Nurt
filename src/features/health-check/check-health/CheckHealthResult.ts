export type CheckHealthResult =
    | {
          status: 'ok';
          database: 'up';
          leadsEmailIndex: 'exists';
      }
    | {
          status: 'degraded';
          database: 'up' | 'down';
          leadsEmailIndex: 'missing';
      };
