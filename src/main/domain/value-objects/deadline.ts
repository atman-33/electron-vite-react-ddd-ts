import { isDate } from 'util/types';
import { ValueObject } from './abstractions/value-object';

export class Deadline extends ValueObject<Date | null, 'Deadline'> {
  constructor(value: Date | null) {
    super(value);
  }

  protected validate(value: Date | null): void {
    if (!isDate(value)) {
      throw new Error('Deadline must be a Date');
    }
  }
}
