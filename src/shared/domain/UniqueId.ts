import { ObjectId } from 'mongodb';

export class UniqueId {
    private readonly value: string;

    constructor(id?: string) {
        this.value = id ?? new ObjectId().toHexString();
    }

    toString(): string {
        return this.value;
    }

    equals(id: UniqueId): boolean {
        return this.value === id.value;
    }
}
