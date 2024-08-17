import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { ValueObject } from './abstractions/value-object';

export class UserId extends ValueObject<string, 'UserId'> {
  constructor(value: string = uuidv4()) {
    super(value);
  }

  protected validate(value: string): void {
    if (!uuidValidate(value)) {
      throw new Error('Invalid UUID format.');
    }
  }
}
