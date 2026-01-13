import { randomUUID } from 'node:crypto';

export class UniqueId {
    private readonly value: string;

    constructor(id?: string) {
        this.value = id ?? randomUUID();
    }

    toString(): string {
        return this.value;
    }

    equals(id: UniqueId): boolean {
        return this.value === id.value;
    }
}
