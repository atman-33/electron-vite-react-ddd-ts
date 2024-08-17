import { ValueObject } from './abstractions/value-object';

export class Content extends ValueObject<string, 'Content'> {
  constructor(value: string) {
    super(value);
  }

  protected validate(value: string): void {
    if (value.length < 1 || value.length > 1000) {
      throw new Error('Content must be between 1 and 1000 characters.');
    }
  }
}
