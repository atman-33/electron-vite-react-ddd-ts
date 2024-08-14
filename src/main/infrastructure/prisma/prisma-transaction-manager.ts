import { inject, injectable } from 'tsyringe';
import { ITransactionManager } from '../../application/shared/itransaction-manager';
import prisma from './prisma-client';
import { PrismaClientManager } from './prisma-client-manager';

@injectable()
export class PrismaTransactionManager implements ITransactionManager {
  constructor(
    @inject('IDataAccessClientManager')
    private clientManager: PrismaClientManager
  ) {}

  async begin<T>(callback: () => Promise<T>): Promise<T | undefined> {
    return await prisma.$transaction(async (transaction) => {
      this.clientManager.setClient(transaction);

      const res = await callback();
      // リセット
      this.clientManager.setClient(prisma);

      return res;
    });
  }
}
