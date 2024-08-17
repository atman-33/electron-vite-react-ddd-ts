import { PrismaClient } from '@prisma/client';
import { EnvRepository } from '../env/env-repository';

const envRepository = new EnvRepository();
const url =
  process.env.NODE_ENV === 'test'
    ? envRepository.get('FAKE_URL')
    : envRepository.get('DATABASE_URL');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: url
    }
  }
});
export default prisma;
