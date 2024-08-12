import { ValueObject } from './abstractions/value-object';

export class SortOrder extends ValueObject<number, 'SortOrder'> {
  constructor(value: number) {
    super(value);
  }

  protected validate(value: number): void {
    if (value < 1) {
      throw new Error('Invalid sort order value.');
    }
  }
}
