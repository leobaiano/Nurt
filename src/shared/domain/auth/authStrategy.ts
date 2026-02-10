export interface AuthStrategy {
  verify(headers: Record<string, any>): Promise<boolean>;
}
