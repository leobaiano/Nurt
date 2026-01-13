export interface CreateLeadDTO {
    name: string;
    email: string;
    phone: string;
    source: string[];
    custom?: Record<string, unknown>;
  }
  