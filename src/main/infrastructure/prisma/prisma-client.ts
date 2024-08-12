import { PrismaClient } from '@prisma/client';
import { EnvRepository } from '../env/env-repository';

const envRepository = new EnvRepository();

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: envRepository.get('DATABASE_URL')
    }
  }
});
export default prisma;
