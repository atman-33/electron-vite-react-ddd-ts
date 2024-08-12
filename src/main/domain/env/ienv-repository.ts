import { Env } from './env';

interface IEnvRepository {
  get<K extends keyof Env>(key: K): Env[K];
}

export type { IEnvRepository };
