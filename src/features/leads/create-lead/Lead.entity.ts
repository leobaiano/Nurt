export class Lead {
  public id?: string;
  public name: string;
  public email: string;
  public phone: string;
  public source: string[];
  public custom?: Record<string, unknown>;

  constructor(props: {
    id?: string;
    name: string;
    email: string;
    phone: string;
    source: string[];
    custom?: Record<string, unknown>;
  }) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.phone = props.phone;
    this.source = props.source;
    this.custom = props.custom;
  }

  addSources(newSources: string[]) {
    const uniqueSources = newSources.filter(
      (s) => !this.source.includes(s)
    );

    if (uniqueSources.length > 0) {
      this.source.push(...uniqueSources);
    }
  }
}
