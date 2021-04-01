import { UserException } from "../../error/Errors";
import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const user = this.usersRepository.findById(user_id);

    if (!user) {
      throw new UserException({
        message: "Usuario não existe",
        status: 404,
      });
    }

    if (user.admin === false) {
      throw new UserException({
        message: "Você não possui acesso essa informação",
        status: 403,
      });
    }

    const users = this.usersRepository.list();

    return users;
  }
}

export { ListAllUsersUseCase };
