import { ValueObject } from './abstractions/value-object';

export class UserName extends ValueObject<string, 'UserName'> {
  constructor(value: string) {
    super(value);
  }

  protected validate(value: string): void {
    if (value.length < 1 || value.length > 20) {
      throw new Error('Name must be between 1 and 20 characters.');
    }
  }
}
