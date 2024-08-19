import { container, Lifecycle } from 'tsyringe';
import { PrismaClientManager } from '../infrastructure/prisma/prisma-client-manager';
import { PrismaTransactionManager } from '../infrastructure/prisma/prisma-transaction-manager';
import { PrismaTodoTypeQueryService } from '../infrastructure/prisma/todo-type/prisma-todo-type-query-service';
import { PrismaTodoRepository } from '../infrastructure/prisma/todo/prisma-todo-repository';
import { PrismaUserRepository } from '../infrastructure/prisma/user/prisma-user-repository';

// re-export the container, so people must import this file
// and not accidentally get `container' directly from tsyringe
export { container as appContainer };

// IDataAccessClientManager
container.register(
  'IDataAccessClientManager',
  {
    useClass: PrismaClientManager
  },
  // The same instance will be resolved for each resolution of this dependency during a single resolution chain
  { lifecycle: Lifecycle.ResolutionScoped }
);

// transactionManager
container.register('ITransactionManager', {
  useClass: PrismaTransactionManager
});

// repository
container.register('IUserRepository', {
  useClass: PrismaUserRepository
});

container.register('ITodoRepository', {
  useClass: PrismaTodoRepository
});

container.register('ITodoTypeQueryService', {
  useClass: PrismaTodoTypeQueryService
});
