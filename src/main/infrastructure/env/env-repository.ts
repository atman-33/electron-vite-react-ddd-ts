import * as dotenv from 'dotenv';
import { app } from 'electron';
import path from 'path';
import { Env } from '../../domain/env/env';
import { IEnvRepository } from '../../domain/env/ienv-repository';

export class EnvRepository implements IEnvRepository {
  constructor() {
    const envPath =
      process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'
        ? `${process.cwd()}/.env`
        : `${path.dirname(app.getPath('exe'))}/resources/.env`;

    dotenv.config({ path: envPath });
  }

  get<K extends keyof Env>(key: K): Env[K] {
    return process.env[key] as Env[K];
  }
}
