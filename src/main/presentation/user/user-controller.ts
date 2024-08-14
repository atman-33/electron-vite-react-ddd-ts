import { UserDto } from '../../application/services/user/dto/user-dto';
import { RegisterUserUseCase } from '../../application/services/user/register-user-use-case';
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

  return {
    registerUser
  };
};

export const userController = useUserController();
