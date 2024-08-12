import { isDate } from 'util/types';
import { ValueObject } from './abstractions/value-object';

export class Deadline extends ValueObject<Date, 'Deadline'> {
  constructor(value: Date) {
    super(value);
  }

  protected validate(value: Date): void {
    if (!isDate(value)) {
      throw new Error('Deadline must be a Date');
    }
  }
}
