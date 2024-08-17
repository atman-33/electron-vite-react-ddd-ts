import { ValueObject } from './abstractions/value-object';

export class Status extends ValueObject<number, 'Status'> {
  public static readonly PENDING = 0;
  public static readonly COMPLETED = 1;

  constructor(value: number) {
    super(value);
  }

  protected validate(value: number): void {
    const validValues = [Status.PENDING, Status.COMPLETED];
    if (!validValues.includes(value)) {
      throw new Error('Invalid status value.');
    }
  }
}
