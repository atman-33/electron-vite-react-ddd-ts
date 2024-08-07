import { Config } from './config';

interface IConfigRepository {
  get(): Config;
  set(config: Config): void;
}

export type { IConfigRepository };
