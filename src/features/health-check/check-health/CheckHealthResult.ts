export type CheckHealthResult =
    | {
        status: 'ok';
        database: 'up';
    }
    | {
        status: 'degraded';
        database: 'down';
    };