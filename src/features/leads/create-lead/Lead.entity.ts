import { UniqueId } from '@/shared/domain/UniqueId';

export class Lead {
  public readonly id: UniqueId;
  public name: string;
  public email: string;
  public phone: string;
  public source: string[];
  public custom?: Record<string, unknown>;

  constructor(props: {
    id?: UniqueId;
    name: string;
    email: string;
    phone: string;
    source: string[];
    custom?: Record<string, unknown>;
  }) {
    this.id = props.id ?? new UniqueId();
    this.name = props.name;
    this.email = props.email;
    this.phone = props.phone;
    this.source = props.source;
    this.custom = props.custom;
  }
}
