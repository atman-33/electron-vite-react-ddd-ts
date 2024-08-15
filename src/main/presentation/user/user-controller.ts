import { DeleteUserUseCase } from '../../application/services/user/delete-user-use-case';
import { UserDto } from '../../application/services/user/dto/user-dto';
import { GetUserByIdUseCase } from '../../application/services/user/get-user-by-id-use-case';
import { GetUsersUseCase } from '../../application/services/user/get-users-use-case';
import { RegisterUserUseCase } from '../../application/services/user/register-user-use-case';
import { UpdateUserUseCase } from '../../application/services/user/update-user-use-case';
import { UserDomain } from '../../domain/models/user/user-domain';
import { UserId } from '../../domain/value-objects/user-id';
import { UserName } from '../../domain/value-objects/user-name';
import { appContainer } from '../di';
import { JSendResponse } from '../shared/jsend-response';

const useUserController = () => {
  const registerUser = async (name: string): Promise<JSendResponse<UserDto>> => {
    const registerUserUseCase = appContainer.resolve(RegisterUserUseCase);

    try {
      const user = await registerUserUseCase.execute(name);
      return { status: 'success', data: user };
    } catch (error: unknown) {
      return { status: 'error', message: (error as Error).message };
    }
  };

  const getUsers = async (): Promise<JSendResponse<UserDto[]>> => {
    const getUsersUseCase = appContainer.resolve(GetUsersUseCase);

    try {
      const users = await getUsersUseCase.execute();
      return { status: 'success', data: users };
    } catch (error: unknown) {
      return { status: 'error', message: (error as Error).message };
    }
  };

  const getUserById = async (id: string): Promise<JSendResponse<UserDto | null>> => {
    const getUserByIdUseCase = appContainer.resolve(GetUserByIdUseCase);

    try {
      const user = await getUserByIdUseCase.execute(new UserId(id));
      return { status: 'success', data: user };
    } catch (error: unknown) {
      return { status: 'error', message: (error as Error).message };
    }
  };

  const updateUser = async (id: string, name: string): Promise<JSendResponse<null>> => {
    const updateUserUseCase = appContainer.resolve(UpdateUserUseCase);

    try {
      await updateUserUseCase.execute(UserDomain.reconstruct(new UserId(id), new UserName(name)));
      return { status: 'success', data: null };
    } catch (error: unknown) {
      return { status: 'error', message: (error as Error).message };
    }
  };

  const deleteUser = async (id: string): Promise<JSendResponse<null>> => {
    const deleteUserUseCase = appContainer.resolve(DeleteUserUseCase);

    try {
      await deleteUserUseCase.execute(new UserId(id));
      return { status: 'success', data: null };
    } catch (error: unknown) {
      return { status: 'error', message: (error as Error).message };
    }
  };

  return {
    registerUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
  };
};

export const userController = useUserController();
