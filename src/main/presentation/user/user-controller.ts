import {
  DeleteUserInput,
  DeleteUserUseCase
} from '../../application/services/user/delete-user-use-case';
import { UserDto } from '../../application/services/user/dto/user-dto';
import {
  GetUserByIdArgs,
  GetUserByIdUseCase
} from '../../application/services/user/get-user-by-id-use-case';
import { GetUsersUseCase } from '../../application/services/user/get-users-use-case';
import {
  RegisterUserInput,
  RegisterUserUseCase
} from '../../application/services/user/register-user-use-case';
import {
  UpdateUserInput,
  UpdateUserUseCase
} from '../../application/services/user/update-user-use-case';
import { appContainer } from '../di';
import { JSendResponse } from '../shared/jsend-response';

const useUserController = () => {
  const registerUser = async (
    registerUserData: RegisterUserInput
  ): Promise<JSendResponse<UserDto>> => {
    const registerUserUseCase = appContainer.resolve(RegisterUserUseCase);

    try {
      const user = await registerUserUseCase.execute(registerUserData);
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

  const getUserById = async (
    getUserByIdArgs: GetUserByIdArgs
  ): Promise<JSendResponse<UserDto | null>> => {
    const getUserByIdUseCase = appContainer.resolve(GetUserByIdUseCase);

    try {
      const user = await getUserByIdUseCase.execute(getUserByIdArgs);
      return { status: 'success', data: user };
    } catch (error: unknown) {
      return { status: 'error', message: (error as Error).message };
    }
  };

  const updateUser = async (updateUserData: UpdateUserInput): Promise<JSendResponse<null>> => {
    const updateUserUseCase = appContainer.resolve(UpdateUserUseCase);

    try {
      await updateUserUseCase.execute(updateUserData);
      return { status: 'success', data: null };
    } catch (error: unknown) {
      return { status: 'error', message: (error as Error).message };
    }
  };

  const deleteUser = async (deleteUserData: DeleteUserInput): Promise<JSendResponse<null>> => {
    const deleteUserUseCase = appContainer.resolve(DeleteUserUseCase);

    try {
      await deleteUserUseCase.execute(deleteUserData);
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
