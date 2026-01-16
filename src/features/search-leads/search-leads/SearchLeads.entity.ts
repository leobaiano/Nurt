export interface SearchLead {
    _id: string;
    name: string;
    email: string;
    phone: string;
    source: string[];
    custom?: Record<string, unknown>;
  }
  